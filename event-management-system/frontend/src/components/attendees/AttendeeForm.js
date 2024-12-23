import React, { useState } from 'react';

const AttendeeForm = ({ onSubmit }) => {
  const [attendee, setAttendee] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'attendee'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(attendee);
    setAttendee({ name: '', email: '', phone: '', role: 'attendee' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={attendee.name}
          onChange={(e) => setAttendee({ ...attendee, name: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={attendee.email}
          onChange={(e) => setAttendee({ ...attendee, email: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Phone</label>
        <input
          type="tel"
          value={attendee.phone}
          onChange={(e) => setAttendee({ ...attendee, phone: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block mb-2">Role</label>
        <select
          value={attendee.role}
          onChange={(e) => setAttendee({ ...attendee, role: e.target.value })}
          className="w-full border rounded p-2"
        >
          <option value="attendee">Attendee</option>
          <option value="speaker">Speaker</option>
          <option value="organizer">Organizer</option>
        </select>
      </div>
      <button 
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Attendee
      </button>
    </form>
  );
};

