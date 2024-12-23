// AttendeeList.js
import React from 'react';

const AttendeeList = ({ attendees, onDelete }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Attendees</h2>
      <div className="space-y-4">
        {attendees.map(attendee => (
          <div key={attendee.email} className="border p-4 rounded shadow">
            <h3 className="text-xl">{attendee.name}</h3>
            <p>Email: {attendee.email}</p>
            <p>Phone: {attendee.phone}</p>
            <p>Role: {attendee.role}</p>
            <button
              onClick={() => onDelete(attendee.email)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { EventList, TaskForm, AttendeeForm, AttendeeList };