import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface ProjectCardProps {
  project: { id: number; name: string; description: string };
  viewProject: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewProject }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" className={classes.projectName}>
          {project.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={classes.projectDescription}>
          {project.description}
        </Typography> 
      </CardContent>
      <CardActions>
        <Button onClick={viewProject} size="small" color="primary" className={classes.viewButton}>
          View
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
});

export default ProjectCard;
