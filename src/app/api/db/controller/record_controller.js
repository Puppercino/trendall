import mongoose from "mongoose";
import Record from "@/app/api/db/model/record_model";

// GET all
const getAllRecords = async (req, res) => {
    const records = await Record.find({}).sort({ createdAt: -1 });

    return records;
}

// GET one
const getOneRecord = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such record!' });
    }

    const record = await Record.findById(id);
    if (!record) {
        return res.status(404).json({ error: 'No such record!' });
    }

    res.status(200).json(record);
}

// POST one
const createOneRecord = async (req, res) => {
    const { refNo, currColl, prevColl } = req.body;

    try {
        const record = await Record.create({ refNo, currColl, prevColl });
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// DELETE one
const deleteOneRecord = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such record!' });
    }

    const record = await Record.findOneAndDelete({ _id: id });
    if (!record) {
        return res.status(400).json({ error: 'No such record!' });
    }

    res.status(200).json(record);
}

// PATCH one
const updateOneRecord = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such record!' });
    }

    const record = await Record.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!record) {
        return res.status(400).json({ error: 'No such record!' });
    }

    res.status(200).json(record);
}

export {
    getAllRecords,
    getOneRecord,
    createOneRecord,
    deleteOneRecord,
    updateOneRecord,
}