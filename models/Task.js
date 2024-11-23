const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minlength: [1, 'Task title must not be empty.'],
    },
    description: {
        type: String,
        trim: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Task', TaskSchema);
