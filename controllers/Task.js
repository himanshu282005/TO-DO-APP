const Task = require('../models/task'); 

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, category } = req.body;

   
        if (!title || title.trim() === "") {
            return res.status(400).json({ message: 'Task title is required and cannot be empty.' });
        }

        const newTask = new Task({ title, description, dueDate, category });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create the task. Please try again later.' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

      
        if (updates.title && updates.title.trim() === "") {
            return res.status(400).json({ message: 'Task title cannot be empty.' });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update the task. Please try again later.' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete the task. Please try again later.' });
    }
};

exports.toggleTaskCompletion = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        if (task.isCompleted && req.body.isCompleted === true) {
            return res.status(400).json({ message: 'Task is already marked as completed.' });
        }

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task completion status. Please try again later.' });
    }
};
