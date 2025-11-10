const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Application = require('../models/Application');
const Job = require('../models/Job');
const { protect, jobSeekerOnly, employerOnly } = require('../middleware/auth');

// @route   POST /api/applications
// @desc    Apply for a job
// @access  Private (Job seekers only)
router.post(
  '/',
  [
    protect,
    jobSeekerOnly,
    [body('jobId').notEmpty().withMessage('Job ID is required')],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobId, coverLetter, resume } = req.body;

    try {
      // Check if job exists
      const job = await Job.findById(jobId);

      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      if (job.status !== 'active') {
        return res.status(400).json({ message: 'This job is no longer active' });
      }

      // Check if already applied
      const existingApplication = await Application.findOne({
        job: jobId,
        applicant: req.user._id,
      });

      if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this job' });
      }

      // Create application
      const application = await Application.create({
        job: jobId,
        applicant: req.user._id,
        coverLetter,
        resume,
      });

      const populatedApplication = await Application.findById(application._id)
        .populate('job', 'title company location')
        .populate('applicant', 'name email');

      res.status(201).json(populatedApplication);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// @route   GET /api/applications/my-applications
// @desc    Get user's applications
// @access  Private (Job seekers only)
router.get('/my-applications', protect, jobSeekerOnly, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location salaryMin salaryMax status')
      .sort({ appliedDate: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/applications/job/:jobId
// @desc    Get applications for a specific job
// @access  Private (Employers only - own jobs)
router.get('/job/:jobId', protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user owns the job
    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view these applications' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email phone skills experience')
      .sort({ appliedDate: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status
// @access  Private (Employers only)
router.put('/:id/status', protect, employerOnly, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'reviewed', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user owns the job
    if (application.job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/applications/:id
// @desc    Get single application
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job')
      .populate('applicant', 'name email phone skills experience');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user is the applicant or the job owner
    const isApplicant = application.applicant._id.toString() === req.user._id.toString();
    const isEmployer = application.job.employer.toString() === req.user._id.toString();

    if (!isApplicant && !isEmployer) {
      return res.status(403).json({ message: 'Not authorized to view this application' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
