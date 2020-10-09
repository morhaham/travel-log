const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: true,
};

// # Log Entry
// * Title - text
// * Description - text
// * Comments - text
// * Rating - scale of 1 - 10
// * Image - text - URL
// * Start Date - DateTime
// * End Date - DateTime
// * Latitude - Number
// * Longitude - Number
// * Created At - DateTime
// * Updated At - DateTime
const logEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  comments: String,
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 10,
  },
  latitude: {
    ...requiredNumber, min: -90, max: 90,
  },
  longitude: {
    ...requiredNumber, min: -180, max: 180,
  },
  visitDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const logEntry = mongoose.model('LogEntry', logEntrySchema);
module.exports = logEntry;
