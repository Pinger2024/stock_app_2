// models/OHLCV.js
import mongoose from 'mongoose';

const OHLCVSchema = new mongoose.Schema({
  ticker: { type: String, required: true },
  date: { type: Date, required: true },
  open: { type: Number },
  close: { type: Number },
  high: { type: Number },
  low: { type: Number },
  volume: { type: Number }
});

export const OHLCVModel = mongoose.model('OHLCV', OHLCVSchema);
