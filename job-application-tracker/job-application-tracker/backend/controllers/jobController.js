const Job = require('../models/Job');

// @route  GET /api/jobs
// Supports optional ?status= and ?search= query params
const getJobs = async (req, res, next) => {
  try {
    const filter = { user: req.user._id };

    if (req.query.status && req.query.status !== 'All') {
      filter.status = req.query.status;
    }

    if (req.query.search) {
      const regex = new RegExp(req.query.search, 'i');
      filter.$or = [{ company: regex }, { position: regex }, { location: regex }];
    }

    const jobs = await Job.find(filter).sort({ applicationDate: -1 });
    res.status(200).json({ count: jobs.length, jobs });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/jobs/stats
const getStats = async (req, res, next) => {
  try {
    const stats = await Job.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const base = { Wishlist: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    stats.forEach((s) => {
      base[s._id] = s.count;
    });
    const total = Object.values(base).reduce((sum, n) => sum + n, 0);

    res.status(200).json({ total, byStatus: base });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/jobs/:id
const getJob = async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job application not found' });
    res.status(200).json({ job });
  } catch (error) {
    next(error);
  }
};

// @route  POST /api/jobs
const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({ ...req.body, user: req.user._id });
    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
};

// @route  PUT /api/jobs/:id
const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ message: 'Job application not found' });
    res.status(200).json({ job });
  } catch (error) {
    next(error);
  }
};

// @route  DELETE /api/jobs/:id
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job application not found' });
    res.status(200).json({ message: 'Job application deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getJobs, getStats, getJob, createJob, updateJob, deleteJob };
