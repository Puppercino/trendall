const Vase = require('../models/vase_model');
const mongoose = require('mongoose');

// GET all 
const getAllVases = async (req, res) => {
  const vases = await Vase.find({}).sort({ createdAt: -1 });

  res.status(200).json(vases);
}

// GET one
const getOneVase = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such vase!' });
  }

  const vase = await Vase.findById(id);
  if (!vase) {
    return res.status(404).json({ error: 'No such vase!' });
  }

  res.status(200).json(vase);
}

// POST one
const createOneVase = async (req, res) => {
  const { refNo, currColl, prevColl } = req.body;

  try {
    const vase = await Vase.create({ refNo, currColl, prevColl });
    res.status(200).json(vase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// DELETE one
const deleteOneVase = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such vase!' });
  }

  const vase = await Vase.findOneAndDelete({ _id: id });
  if (!vase) {
    return res.status(400).json({ error: 'No such vase!' });
  }

  res.status(200).json(vase);
}

// PATCH one
const updateOneVase = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such vase!' });
  }

  const vase = await Vase.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!vase) {
    return res.status(400).json({ error: 'No such vase!' });
  }

  res.status(200).json(vase);
}

module.exports = {
  getAllVases,
  getOneVase,
  createOneVase,
  deleteOneVase,
  updateOneVase,
};