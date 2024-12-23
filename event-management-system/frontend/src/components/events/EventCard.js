import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Chip, Box } from '@mui/material';
import { CalendarToday, LocationOn, Person } from '@mui/icons-material';

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <Card className="event-card">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {event.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarToday fontSize="small" />
            {new Date(event.date).toLocaleDateString()}
          </Box>
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOn fontSize="small" />
            {event.location}
          </Box>
        </Typography>
        <Typography variant="body2" paragraph>
          {event.description}
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          {event.attendees?.map((attendee) => (
            <Chip
              key={attendee._id}
              icon={<Person />}
              label={attendee.name}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(event)}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(event._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};