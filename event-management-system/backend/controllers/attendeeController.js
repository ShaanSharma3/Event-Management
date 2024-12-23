const { Attendee, Event } = require('../models');

const createAttendee = async (req, res) => {
  try {
    const attendee = new Attendee(req.body);
    await attendee.save();
    res.json(attendee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find().populate('events');
    res.json(attendees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAttendee = async (req, res) => {
  try {
    const attendee = await Attendee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(attendee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAttendee = async (req, res) => {
  try {
    await Attendee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Attendee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAttendee, getAttendees, updateAttendee, deleteAttendee };

