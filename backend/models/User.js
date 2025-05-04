const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  picture: String,
  onboardingComplete: {type: Boolean, default: false},
  overallGrade: {type: String, default: '-'},
  role: { 
    type: String, 
    enum: ['user', 'admin', 'organization'],
    default: 'user' 
  },
  questionAnswers: { type: Map, of: String },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
  organizationDetails: {
    name: String,
    description: String,
    contactEmail: String,
    website: String,
    eventsCount: { type: Number, default: 0 },
    selectedCandidatesCount: {type: Number, default: 0 }
  },
  isApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);