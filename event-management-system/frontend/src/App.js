import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './app/store';
import theme from './utils/theme';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/layout/Navbar';

// Import pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import EventList from './components/events/EventList';
import EventForm from './components/events/EventForm';
import AttendeeList from './components/attendees/AttendeeList';
import TaskList from './components/tasks/TaskList';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><EventList /></PrivateRoute>} />
            <Route path="/events/new" element={<PrivateRoute><EventForm /></PrivateRoute>} />
            <Route path="/attendees" element={<PrivateRoute><AttendeeList /></PrivateRoute>} />
            <Route path="/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

