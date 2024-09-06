import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface ProjectCardProps {
  project: { id: number; name: string; description: string };
  viewProject: () => void;
  editProject: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewProject, editProject }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" className={classes.projectName}>
          {project.name}
        </Typography>
        <Typography  variant="body2" color="textSecondary" className={`${classes.projectDescription} ${classes.clampDescription}`}>
          {project.description}
        </Typography> 
      </CardContent>
      <CardActions className={classes.buttonWrap}>
        <Button onClick={viewProject} size="small" color="primary" className={classes.viewButton}>
          View
        </Button>
      </CardActions>
      <CardActions className={classes.editButtonWrap}>
        <Button onClick={editProject} size="small" color="primary" className={classes.editButton}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles({
  card: {
    borderRadius: '15px !important',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1) !important',
    backgroundColor: '#fff !important',
    transition: 'transform 0.3s ease-in-out !important',
    '&:hover': {
      transform: 'translateY(-10px) !important',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2) !important',
    },
    minHeight: '154px',
    position: 'relative',
  },
  projectName: {
    fontSize: '1.2rem !important',
    fontWeight: 'bold !important',
    marginBottom: '10px !important',
    color: '#3f51b5 !important',
  },
  projectDescription: {
    color: '#757575 !important',
  },
  viewButton: {
    marginLeft: 'auto !important',
    color: '#3f51b5 !important',
    fontWeight: 'bold !important',
    '&:hover': {
      color: '#303f9f !important',
    },
  },
  editButton: {
    marginLeft: 'auto !important',
    color: '#3f51b5 !important',
    fontWeight: 'bold !important',
    '&:hover': {
      color: '#303f9f !important',
    },
  },
  buttonWrap: {
    position: 'absolute',
    bottom: '0 !important',
    right: '0 !important'
  },
  editButtonWrap: {
    position: 'absolute',
    bottom: '0 !important',
    right: '55px !important'
  },
  clampDescription: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default ProjectCard;
