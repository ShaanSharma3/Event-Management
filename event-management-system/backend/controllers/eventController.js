const { Event } = require('../models');

// Create new event
const createEvent = async (req, res) => {
  try {
    // 1. Create event with user ID from auth middleware
    const event = new Event({
      ...req.body,
      createdBy: req.user.id
    });

    // 2. Save event to database
    await event.save();

    // 3. Populate references and return
    const populatedEvent = await event
      .populate('attendees')
      .populate('tasks')
      .execPopulate();

    res.json(populatedEvent);
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    // Find events and populate related data
    const events = await Event.find()
      .populate('attendees')
      .populate('tasks')
      .populate('createdBy', 'name email')
      .sort({ date: -1 }); // Sort by date descending

    res.json(events);
  } catch (err) {
    console.error('Get events error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('attendees')
      .populate('tasks')
      .populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error('Get event by ID error:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user owns the event
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update fields
    Object.assign(event, req.body);
    await event.save();

    // Return updated event with populated fields
    const updatedEvent = await Event.findById(req.params.id)
      .populate('attendees')
      .populate('tasks')
      .populate('createdBy', 'name email');

    res.json(updatedEvent);
  } catch (err) {
    console.error('Update event error:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user owns the event
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await event.remove();
    res.json({ message: 'Event removed' });
  } catch (err) {
    console.error('Delete event error:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Add attendee to event
const addAttendee = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if attendee already exists
    if (event.attendees.includes(req.body.attendeeId)) {
      return res.status(400).json({ message: 'Attendee already added' });
    }

    event.attendees.push(req.body.attendeeId);
    await event.save();

    const updatedEvent = await Event.findById(req.params.id)
      .populate('attendees')
      .populate('tasks')
      .populate('createdBy', 'name email');

    res.json(updatedEvent);
  } catch (err) {
    console.error('Add attendee error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addAttendee
};