import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  LinearProgress,
  Box
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask, deleteTask } from '../../features/tasks/taskSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleStatusChange = async (taskId, completed) => {
    dispatch(updateTask({ id: taskId, status: completed ? 'Completed' : 'Pending' }));
  };

  const calculateProgress = () => {
    if (!tasks.length) return 0;
    const completed = tasks.filter(task => task.status === 'Completed').length;
    return (completed / tasks.length) * 100;
  };

  if (loading) return <LinearProgress />;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Task Progress
        </Typography>
        <Box sx={{ mb: 4 }}>
          <LinearProgress 
            variant="determinate" 
            value={calculateProgress()} 
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="body2" color="textSecondary" align="right" sx={{ mt: 1 }}>
            {`${Math.round(calculateProgress())}% Complete`}
          </Typography>
        </Box>
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              sx={{
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Checkbox
                checked={task.status === 'Completed'}
                onChange={(e) => handleStatusChange(task._id, e.target.checked)}
              />
              <ListItemText
                primary={task.name}
                secondary={`Due: ${new Date(task.deadline).toLocaleDateString()}`}
                sx={{
                  textDecoration: task.status === 'Completed' ? 'line-through' : 'none'
                }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                  <Edit />
                </IconButton>
                <IconButton 
                  edge="end" 
                  aria-label="delete"
                  onClick={() => dispatch(deleteTask(task._id))}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TaskList;