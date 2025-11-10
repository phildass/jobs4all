const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Job = require('../models/Job');
const { protect, employerOnly } = require('../middleware/auth');

// @route   GET /api/jobs
// @desc    Get all jobs with filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      location,
      category,
      minSalary,
      maxSalary,
      experienceRequired,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query = { status: 'active' };

    // Add filters
    if (location) {
      query.location = location;
    }

    if (category) {
      query.category = category;
    }

    if (minSalary) {
      query.salaryMax = { $gte: parseInt(minSalary) };
    }

    if (maxSalary) {
      query.salaryMin = { $lte: parseInt(maxSalary) };
    }

    if (experienceRequired !== undefined) {
      query.experienceRequired = { $lte: parseInt(experienceRequired) };
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const jobs = await Job.find(query)
      .populate('employer', 'name email company')
      .sort({ postedDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Job.countDocuments(query);

    res.json({
      jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get single job
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      'employer',
      'name email company phone'
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private (Employers only)
router.post(
  '/',
  [
    protect,
    employerOnly,
    [
      body('title').trim().notEmpty().withMessage('Title is required'),
      body('company').trim().notEmpty().withMessage('Company is required'),
      body('description').notEmpty().withMessage('Description is required'),
      body('location').notEmpty().withMessage('Location is required'),
      body('salaryMin')
        .isNumeric()
        .withMessage('Minimum salary must be a number'),
      body('salaryMax')
        .isNumeric()
        .withMessage('Maximum salary must be a number'),
      body('experienceRequired')
        .isNumeric()
        .withMessage('Experience required must be a number'),
      body('category').notEmpty().withMessage('Category is required'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const job = await Job.create({
        ...req.body,
        employer: req.user._id,
      });

      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private (Employers only - own jobs)
router.put('/:id', protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user owns the job
    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private (Employers only - own jobs)
router.delete('/:id', protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user owns the job
    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();

    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/jobs/employer/my-jobs
// @desc    Get employer's jobs
// @access  Private (Employers only)
router.get('/employer/my-jobs', protect, employerOnly, async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user._id }).sort({
      postedDate: -1,
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
