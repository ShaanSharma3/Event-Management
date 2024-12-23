
const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createAttendee,
  getAttendees,
  updateAttendee,
  deleteAttendee
} = require('../controllers/attendeeController');

router.post('/', auth, createAttendee);
router.get('/', auth, getAttendees);
router.put('/:id', auth, updateAttendee);
router.delete('/:id', auth, deleteAttendee);

module.exports = router;

