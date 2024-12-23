// EventList.js
import React, { useState } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Conference', date: '2024-12-25', location: 'Convention Center' }
  ]);

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="border p-4 rounded shadow">
            <h3 className="text-xl">{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <button 
              onClick={() => deleteEvent(event.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ title: '', description: '', dueDate: '', assignedTo: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block mb-2">Due Date</label>
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block mb-2">Assigned To</label>
        <input
          type="text"
          value={task.assignedTo}
          onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>
      <button 
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};
