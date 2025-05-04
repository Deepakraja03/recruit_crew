const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/User");
const Event = require("./models/Event");
const Application = require("./models/Application");
const nodemailer = require('nodemailer');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Create User Profile
app.post("/api/create-profile", async (req, res) => {
  try {
    const { name, email, picture, onboardingComplete } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, picture, onboardingComplete });
      await user.save();
    }

    res.status(200).json({ message: "Profile created successfully", user });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get User ID from Email
app.get("/api/get-user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get full user profile by email
app.get("/api/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
});

// Update User Grade
app.post("/api/update-profile", async (req, res) => {
  try {
    console.log("Received update-profile request:", req.body);

    const { email, questions, answers, overallGrade } = req.body;

    if (!email || !Array.isArray(questions) || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }

    if (questions.length !== answers.length) {
      return res.status(400).json({ message: "Questions and answers length mismatch" });
    }

    const questionAnswers = {};
    questions.forEach((question, index) => {
      if (answers[index] !== undefined && answers[index] !== null) {
        const safeKey = question.replace(/\./g, "[dot]"); // replace dots
        questionAnswers[safeKey] = answers[index];
      }
    });


    const user = await User.findOneAndUpdate(
      { email },
      {
        onboardingComplete: true,
        overallGrade,
        questionAnswers,
      },
      { new: true }
    );

    if (!user) {
      console.log("No user found with email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated successfully:", user.email);
    return res.status(200).json({ message: "User profile updated successfully", user });

  } catch (error) {
    console.error("Error updating user profile:", error.message);
    return res.status(500).json({ message: "Failed to update user profile", error: error.message });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const { search, location, startDate, endDate } = req.query;

    // Build the filter object
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" }; // Case-insensitive search on title
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const events = await Event.find(filter).sort({ date: 1 }); // Sort by date (ascending)

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/AdminEvents", async (req, res) => {
  try {
    const events = await Event.find();  // Fetching all events from the DB
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

app.post("/api/events", async (req, res) => {
  try {
    const { email, title, description, location, date, categories, grade } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has the 'admin' role
    if (user.role !== "admin" && user.role !== "organization") {
      return res.status(403).json({ message: "You do not have permission to create events" });
    }

    // Create a new event and include the organizerId
    const newEvent = new Event({
      organizerId: user._id,
      email,
      title,
      description,
      location,
      date,
      categories,
      grade,
    });

    await newEvent.save();

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get('/api/events', async (req, res) => {
  const { email } = req.query;
  try {
    const events = await Event.find({ email });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.get("/api/applications/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate({
      path: "applications",
      populate: { path: "user", select: "name email" },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.applications);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/events/detail/:id", async (req, res) => {
  try {
    // Find the event by ID
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/organization-register", async (req, res) => {
  const { name, email, description, contactEmail, website } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Organization already registered." });
    }

    // Create new organization user
    user = new User({
      name,
      email,
      role: "organization",
      organizationDetails: {
        name,
        description,
        contactEmail,
        website,
      },
      onboardingComplete: false,
      isApproved: false,
    });

    await user.save();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Organization Application is Under Review',
      text: `Dear ${name},\n\nYour application for organization registration is under review. We will notify you once your application has been approved.\n\nThank you!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Server error' });
      }
      console.log('Email sent: ' + info.response);
    });

    res.status(201).json({ message: "Organization registered successfully." });
  } catch (error) {
    console.error("Error registering organization:", error);
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/organizations/:id/approve", async (req, res) => {
  const { id } = req.params;
  const { approve } = req.body;

  try {
    const user = await User.findById(id);
    if (!user || user.role !== "organization") {
      return res.status(404).json({ message: "Organization not found" });
    }

    user.isApproved = approve;
    user.onboardingComplete = approve;
    await user.save();
    console.log("user email", user.email);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: approve ? 'Your Organization Application has been Approved' : 'Your Organization Application has been Rejected',
      text: approve
        ? `Dear ${user.name},\n\nWe are pleased to inform you that your organization application has been approved.\n\nWelcome aboard!`
        : `Dear ${user.name},\n\nWe regret to inform you that your organization application has been rejected.\n\nThank you for your interest!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Server error' });
      }
      console.log('Email sent: ' + info.response);
    });

    res.json({ message: `Organization ${approve ? "approved" : "rejected"}` });
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/admin/organizations", async (req, res) => {
  try {
    const orgs = await User.find({ role: "organization" });
    res.status(200).json(orgs);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(500).json({ message: "Failed to fetch organizations" });
  }
});

app.get("/organization/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Find the organization by email
    const organization = await User.findOne({ role: "organization", email: email });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(organization);
  } catch (error) {
    console.error("Error fetching organization by email:", error);
    res.status(500).json({ message: "Failed to fetch organization details" });
  }
});

app.post("/api/applications", async (req, res) => {
  const { userEmail, eventId } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Create the application
    const application = new Application({
      eventId,
      user: user._id,
      approvalStatus: "pending",
    });

    const savedApp = await application.save();

    // Push to user's applications array
    user.applications.push(savedApp._id);
    await user.save();

    res.status(201).json({ message: "Application submitted", application: savedApp });
  } catch (err) {
    console.error("Error submitting application:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/applications/:id/approve", async (req, res) => {
  const { id } = req.params;
  const { approve } = req.body;

  try {
    const application = await Application.findById(id).populate("eventId");

    if (!application) return res.status(404).json({ message: "Application not found" });

    // Check if the current user is an organization
    const organization = await User.findById(application.eventId.organizerId);
    if (!organization || organization.role !== "organization") {
      return res.status(403).json({ message: "Only organizations can approve applications" });
    }

    // Update approval status
    application.approvalStatus = approve ? "approved" : "rejected";
    await application.save();

    res.status(200).json({ message: `Application ${approve ? "approved" : "rejected"}`, application });
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/organizations/email/:email/applications", async (req, res) => {
  const { email } = req.params;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the organizationId from the user document
    const organizationId = user._id;

    // Fetch events organized by the given organizationId
    const events = await Event.find({ organizerId: organizationId }).select("_id");
    const eventIds = events.map(e => e._id);

    // Fetch applications for the events managed by the organization
    const applications = await Application.find({ eventId: { $in: eventIds } })
      .populate("user", "name email")
      .populate("eventId");

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));