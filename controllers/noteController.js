const Notes = require('../models/noteModel');
const { noteCreateSchema, noteUpdateSchema } = require('../validations/noteValidation');

exports.createNote = async (req, res) => {
    try {
        const { error, value } = noteCreateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { title, description, category, completed } = req.body;
        const noteData = { title, description, category, completed }
        const newNote = new Notes(noteData);
        await newNote.save();
        res.status(201).json({
            status: 'Success',
            message: 'Note created successfully',
            note: newNote,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getAllNotes = async (req, res) => {
    try {
        const { category, search } = req.query;
        const query = {};

        const validCategories = ["Work", "Personal", "Others"];
        if (category && !validCategories.includes(category)) {
            return res.status(400).json({
                status: "Fail",
                message: `Invalid category. Valid categories are: ${validCategories.join(", ")}.`,
            });
        }

        if (category) query.category = category;

        if (search) query.title = { $regex: search, $options: "i" };

        const notes = await Notes.find(query).sort({ createdAt: -1 });

        if (notes.length === 0) {
            return res.status(404).json({
                status: "Fail",
                message: "No notes match the query criteria.",
            });
        }

        res.status(200).json({
            status: 'Success',
            results: notes.length,
            notes,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Note not found',
            });
        }
        res.status(200).json({
            status: 'Success',
            note,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { error, value } = noteUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { title, description, category, completed } = req.body;
        const noteData = { title, description, category, completed };

        const updatedNote = await Notes.findByIdAndUpdate(
            req.params.id,
            noteData,
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Note not found',
            });
        }

        res.status(200).json({
            status: 'Success',
            message: 'Note updated successfully',
            note: updatedNote,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Note not found',
            });
        }

        res.status(200).json({
            status: 'Success',
            message: 'Note deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
