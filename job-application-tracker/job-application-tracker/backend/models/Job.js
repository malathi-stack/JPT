const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: 120,
    },
    position: {
      type: String,
      required: [true, 'Position title is required'],
      trim: true,
      maxlength: 120,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '',
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'],
      default: 'Full-time',
    },
    status: {
      type: String,
      enum: ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'],
      default: 'Applied',
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: String,
      trim: true,
      maxlength: 60,
      default: '',
    },
    jobUrl: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    contactPerson: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: '',
    },
  },
  { timestamps: true }
);

JobSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Job', JobSchema);
