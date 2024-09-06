import React, { useEffect, useState} from 'react';
import { Grid, Typography, Button, Container } from '@mui/material';
import ProjectCard from 'components/ProjectCard';
import { makeStyles } from '@mui/styles';
import Header from 'components/Header';
import { useNavigate } from 'react-router-dom';
import ProjectService from 'services/Project'
import { Project } from 'types/types';
import { toast } from 'react-toastify';
import LoadingSpinner from 'components/LoadingSpinner';
import './ProjectList.scss'

const ProjectList = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await ProjectService.getAllProjects()
      setProjects(response?.data)
      setLoading(false)
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, []);

  const navigateToCreateProject = () => {
    navigate('/create-project')
  }

  const viewProject = (id: number, name: string) => {
    navigate('/board', { state: { projectId: id, projectName: name } })
  }

  const editProject = (projectDetails: Project) => {
    navigate('/create-project', { state: { projectDetails, mode: 'edit' } })
  }

  return (
    <div className='projects'>
      <Header />
      <Container className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h4" className={classes.title}>My Projects</Typography>
          <Button onClick={navigateToCreateProject} variant="contained" color="primary" className={classes.createButton}>
            + New Project
          </Button>
        </div>
        <Grid container spacing={4} className={classes.gridContainer}>
          {loading && (
            <div className='projects__loader'>
              <LoadingSpinner color='#3f51b5' />
            </div>
          )}
          {!loading && (
            projects?.map(project => (
              <Grid item xs={12} sm={6} md={4} key={project?.id}>
                <ProjectCard 
                  viewProject={() => viewProject(project?.id, project?.name)} 
                  editProject={() => editProject(project)} 
                  project={project} 
                />
              </Grid> 
            ))
          )}
          {(!projects?.length && !loading) && (
            <div className='projects__noProjectsWrap'>
              <p>No projects found!</p>
            </div>
          )}
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

