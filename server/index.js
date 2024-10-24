import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { OHLCVModel } from './models/OHLCV.js';
import { IndicatorModel } from './models/Indicator.js';

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
    const stocks = await OHLCVModel.aggregate([
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
        },
      },
      { $sort: { date: -1 } }, // Sort by date to get the most recent
      { $limit: 10 } // You can adjust this limit if needed
    ]);

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
