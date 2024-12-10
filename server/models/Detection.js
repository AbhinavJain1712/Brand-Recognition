import mongoose from 'mongoose';

const DetectionSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  brand: String,
  expiry_date: String,
  count: Number,
  expired: Boolean,
  expected_lifespan: Number,
});

const Detection = mongoose.model("Detection", DetectionSchema);
export default Detection;
