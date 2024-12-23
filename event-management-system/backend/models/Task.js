const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' }
  });
  
  const Task = mongoose.model('Task', taskSchema);
  module.exports = { Task };