const express = require('express');
const {
  getAllRecords,
  getOneRecord,
  createOneRecord,
  deleteOneRecord,
  updateOneRecord,
} = require('../controllers/record_controller');

const router = express.Router();

// GET all 
router.get('/', getAllRecords);

// GET one
router.get('/:id', getOneRecord);

// POST one
router.post('/', createOneRecord);

// DELETE one 
router.delete('/:id', deleteOneRecord);

// PATCH one
router.patch('/:id', updateOneRecord);

module.exports = router;