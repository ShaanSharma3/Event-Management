// controllers/taskController.js
const { Task, Event } = require('../models');

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    
    if (req.body.event) {
      await Event.findByIdAndUpdate(req.body.event, {
        $push: { tasks: task._id }
      });
    }
    
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('event')
      .populate('assignedTo');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    await Event.findByIdAndUpdate(task.event, {
      $pull: { tasks: task._id }
    });
    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };