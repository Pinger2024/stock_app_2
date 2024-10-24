import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the route to fetch stocks with combined data from ohlcv_data and indicators
app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await mongoose.connection.db.collection('ohlcv_data').aggregate([
      {
        $lookup: {
          from: 'indicators',
          localField: 'ticker',
          foreignField: 'ticker',
          as: 'indicator_data',
        },
      },
      { $unwind: '$indicator_data' }, // Flatten the array returned by lookup
      {
        $project: {
          _id: 0,
          ticker: 1,
          close: 1,
          date: 1,
          high: 1,
          low: 1,
          open: 1,
          volume: 1,
          rs_score: '$indicator_data.rs_score',
          industry: '$indicator_data.industry',
          sector: '$indicator_data.sector',
          minervini_criteria: '$indicator_data.minervini_criteria',
        },
      },
      { $sort: { date: -1 } }, // Sort by date to get the most recent
      { $limit: 10 } // You can adjust this limit if needed
    ]).toArray();

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define the route to filter stocks (if needed)
app.get('/api/stocks/filter', async (req, res) => {
  try {
    const { sector, industry, rs_score_min, rs_score_max } = req.query;
    const query = {};

    if (sector) query['indicator_data.sector'] = sector;
    if (industry) query['indicator_data.industry'] = industry;
    if (rs_score_min) query['indicator_data.rs_score'] = { $gte: parseInt(rs_score_min) };
    if (rs_score_max) query['indicator_data.rs_score'] = { $lte: parseInt(rs_score_max) };

    const stocks = await mongoose.connection.db.collection('ohlcv_data').aggregate([
      {
        $lookup: {
          from: 'indicators',
          localField: 'ticker',
          foreignField: 'ticker',
          as: 'indicator_data',
        },
      },
      { $unwind: '$indicator_data' },
      { $match: query }, // Apply filters
      {
        $project: {
          _id: 0,
          ticker: 1,
          close: 1,
          date: 1,
          high: 1,
          low: 1,
          open: 1,
          volume: 1,
          rs_score: '$indicator_data.rs_score',
          industry: '$indicator_data.industry',
          sector: '$indicator_data.sector',
          minervini_criteria: '$indicator_data.minervini_criteria',
        },
      },
      { $sort: { date: -1 } }
    ]).toArray();

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
