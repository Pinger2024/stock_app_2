import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  change: { type: Number, required: true },
  marketCap: { type: String, required: true },
  pe: { type: Number },
  volume: { type: String, required: true },
  sector: { type: String },
  dividendYield: { type: Number }
});

export const StockModel = mongoose.model('Stock', stockSchema);