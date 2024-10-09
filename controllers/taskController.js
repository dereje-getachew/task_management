const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const task = new Task({
            title,
            description,
            status: status || false,
            dueDate,
            user: req.user.id, 
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};S

exports.getTasks = async (req, res) => {
    // Destructure query parameters
    const { page = 1, limit = 10, sortBy = 'dueDate', order = 'asc', status } = req.query;
    const filter = { user: req.user.id }; // Ensure userId is used for filtering

    // Handle filtering by status
    if (status !== undefined) {
        filter.status = status === 'true'; // Convert string to boolean
    }

    try {
        // Set sort options based on the order
        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1; // 1 for ascending, -1 for descending

        // Fetch tasks with pagination, sorting, and filtering
        const tasks = await Task.find(filter)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // Get the total count of documents matching the filter for pagination
        const count = await Task.countDocuments(filter);
        res.json({
            tasks,
            totalPages: Math.ceil(count / limit), 
            currentPage: page,
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { title, description, status, dueDate },
            { new: true }
        );

        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
