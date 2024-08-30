import React from 'react';
import { Grid, Typography, Button, Container } from '@mui/material';
import ProjectCard from 'components/ProjectCard';
import { makeStyles } from '@mui/styles';
import Header from 'components/Header';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const projects = [
    { id: 1, name: 'Project Alpha', description: 'Description of Project Alpha' },
    { id: 2, name: 'Project Beta', description: 'Description of Project Beta' },
    { id: 3, name: 'Project Gamma', description: 'Description of Project Gamma' },
  ];

  const navigateToCreateProject = () => {
    navigate('/create-project')
  }

  const viewProject = () => {
    navigate('/board')
  }

  return (
    <div>
      <Header />
      <Container className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h4" className={classes.title}>My Projects</Typography>
          <Button onClick={navigateToCreateProject} variant="contained" color="primary" className={classes.createButton}>
            + New Project
          </Button>
        </div>
        <Grid container spacing={4} className={classes.gridContainer}>
          {projects.map(project => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard viewProject={viewProject} project={project} />
            </Grid> 
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ProjectList;

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px !important',
  },
  root: {
    padding: '40px 20px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#3f51b5',
    fontWeight: 'bold',
  },
  gridContainer: {
    marginBottom: '30px',
  },
  createButton: {
    padding: '10px 20px !important',
    borderRadius: '10px !important',
    backgroundColor: '#3f51b5 !important',
    color: '#fff !important',
    fontWeight: 'bold !important',
    fontSize: '16px !important',
    '&:hover': {
      backgroundColor: '#303f9f !important',
    },
  },
});

