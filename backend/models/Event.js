const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: String,
  title: String,
  description: String,
  location: String,
  date: Date,
  categories: {type: [String], default: ["NGO"]},
  grade: {type: String, default: "F"}
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;