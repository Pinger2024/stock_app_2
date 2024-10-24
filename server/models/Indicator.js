// models/Indicator.js
import mongoose from 'mongoose';

const IndicatorSchema = new mongoose.Schema({
  ticker: { type: String, required: true },
  rs_score: { type: Number, required: true },
  sector: { type: String },
  industry: { type: String },
  date: { type: Date, default: Date.now }
});

export const IndicatorModel = mongoose.model('Indicator', IndicatorSchema);
