const express = require('express');
const {
  getAllVases,
  getOneVase,
  createOneVase,
  deleteOneVase,
  updateOneVase,
} = require('../controllers/vase_controller');

const router = express.Router();

// GET all 
router.get('/', getAllVases);

// GET one
router.get('/:id', getOneVase);

// POST one
router.post('/', createOneVase);

// DELETE one 
router.delete('/:id', deleteOneVase);

// PATCH one
router.patch('/:id', updateOneVase);

module.exports = router;