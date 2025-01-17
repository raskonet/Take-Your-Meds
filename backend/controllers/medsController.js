const Meds = require('../models/medsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create new medication
exports.createMed = catchAsync(async (req, res, next) => {
  const newMed = await Meds.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      med: newMed,
    },
  });
});

// Get all medications for a user
exports.getAllMeds = catchAsync(async (req, res, next) => {
  const meds = await Meds.find({ userId: req.user.id });

  res.status(200).json({
    status: 'success',
    results: meds.length,
    data: {
      meds,
    },
  });
});

// Get a single medication by ID
exports.getMed = catchAsync(async (req, res, next) => {
  const med = await Meds.findById(req.params.id);

  if (!med) {
    return next(new AppError('No medication found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      med,
    },
  });
});

// Update medication
exports.updateMed = catchAsync(async (req, res, next) => {
  const med = await Meds.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!med) {
    return next(new AppError('No medication found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      med,
    },
  });
});

// Delete medication
exports.deleteMed = catchAsync(async (req, res, next) => {
  const med = await Meds.findByIdAndDelete(req.params.id);

  if (!med) {
    return next(new AppError('No medication found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
