const mongoose = require('mongoose');
const attendeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
  });
  
  const Attendee = mongoose.model('Attendee', attendeeSchema);
  module.exports = { Attendee };