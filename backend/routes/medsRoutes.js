const express = require('express');
const medsController = require('../controllers/medsController');
const userController = require('../controllers/userController');

const router = express.Router();

// Protect all routes below this line (only authenticated users can access)
router.use(userController.protect);

// CRUD operations for medications
router
  .route('/')
  .get(medsController.getAllMeds)    // Get all medications for the authenticated user
  .post(medsController.createMed);   // Create a new medication

router
  .route('/:id')
  .get(medsController.getMed)        // Get a single medication by its ID
  .patch(medsController.updateMed)   // Update a medication by its ID
  .delete(medsController.deleteMed); // Delete a medication by its ID

module.exports = router;

