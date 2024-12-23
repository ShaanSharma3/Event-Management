const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
  });
  
  const Event = mongoose.model('Event', eventSchema);
  module.exports = {  Event };