import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { Work, Description, CalendarToday } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Header from 'components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import ProjectService from 'services/Project'
import { toast } from 'react-toastify';
import LoadingSpinner from 'components/LoadingSpinner';
import './CreateProject.scss'
import ImageLinks from 'utils/ImageLinks';

const CreateProjectForm = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const editMode = location?.state?.mode === 'edit'
  const classes = useStyles();
  const [projectName, setProjectName] = useState<string>(location?.state?.projectDetails?.name ?? '');
  const [description, setDescription] = useState<string>(location?.state?.projectDetails?.description ?? '');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (editMode) {
        await ProjectService.updateProject({
          name: projectName,
          description,
          projectId: location?.state?.projectDetails?.id,
        })
      } else {
        await ProjectService.createProject({
          name: projectName,
          description,
        })
      }
      navigate('/projects')
      setLoading(false)
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false)
    }
  };

  const goBack = () => {
    navigate('/projects')
  };

  return (
    <div>
      <Header />
      <Container className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <div className='headerWrap'>
            <div role="button" className="backButtonContainer" onClick={goBack}>
              <img alt="backArrow" src={ImageLinks.leftArrowIcon} />
            </div>
            <Typography variant="h4" className={classes.title}>{editMode ? 'Edit Project' : 'Create New Project'}</Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Project Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Work />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={classes.textField}
              multiline
              rows={4}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description />
                  </InputAdornment>
                ),
              }}
            />
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className={classes.textField}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className={classes.textField}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!projectName || !description || loading}
              style={{ opacity: (!projectName || !description) ? '0.5' : '1' }}
              className={classes.submitButton}
            >
              {!loading && (editMode ? 'Edit Project' : 'Create Project')}
              {loading && <LoadingSpinner />}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    height: '100% !important',
    marginTop: '40px'
  },
  paper: {
    padding: '30px !important',
    borderRadius: '15px !important',
    backgroundColor: '#fff !important',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1) !important',
    maxWidth: '600px !important',
    width: '100% !important',
  },
  title: {
    marginLeft: '20px !important',
    textAlign: 'center',
    color: '#3f51b5 !important',
    fontWeight: 'bold !important',
  },
  textField: {
    marginBottom: '20px !important',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#3f51b5 !important',
      },
      '&:hover fieldset': {
        borderColor: '#303f9f !important',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1a237e !important',
      },
    },
  },
  submitButton: {
    display: 'block !important',
    width: '100% !important',
    padding: '10px !important',
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

export default CreateProjectForm;
