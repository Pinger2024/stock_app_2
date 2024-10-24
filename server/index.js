import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { StockModel } from './models/Stock.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await StockModel.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/stocks/filter', async (req, res) => {
  try {
    const { marketCap, sector, peRatio, dividendYield } = req.query;
    const query = {};
    
    if (marketCap) query.marketCap = marketCap;
    if (sector) query.sector = sector;
    if (peRatio) query.pe = { $lte: parseFloat(peRatio) };
    if (dividendYield) query.dividendYield = { $gte: parseFloat(dividendYield) };
    
    const stocks = await StockModel.find(query);
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});