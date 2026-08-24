const express = require('express');
const {
  getJobs,
  getStats,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // every route below requires a valid JWT

router.get('/stats', getStats);
router.route('/').get(getJobs).post(createJob);
router.route('/:id').get(getJob).put(updateJob).delete(deleteJob);

module.exports = router;
