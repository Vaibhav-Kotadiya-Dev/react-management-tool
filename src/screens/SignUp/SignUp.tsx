import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Email, Person } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import AuthService from 'services/Login'
import LoadingSpinner from 'components/LoadingSpinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import session from 'utils/session';

const SignUpForm = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const token = session.getValue('token')

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setLoading(true)
      try {
        await AuthService.signUp({
          firstName,
          lastName,
          email,
          password
        })
        setLoading(false)
        setErrorText('')
        toast.success("Registered successful");
        navigate('/login')
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setLoading(false)
        setErrorText('')
      }
    } else {
      setErrorText('Passwords do not match')
    }
  };

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4" className={classes.title}>Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="outlined-error-helper-text"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errorText}
            helperText={errorText}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            disabled={loading}
          >
            {!loading && 'Sign Up'}
            {loading && <LoadingSpinner />}
          </Button>
        </form>
        <Typography variant="body2" className={classes.switchText}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    height: '100vh !important',
    backgroundColor: '#f5f5f5 !important',
  },
  paper: {
    padding: '30px !important',
    borderRadius: '15px !important',
    backgroundColor: '#fff !important',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1) !important',
    maxWidth: '400px !important',
    width: '100% !important',
  },
  title: {
    marginBottom: '20px !important',
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
    marginTop: '20px !important'
  },
  switchText: {
    marginTop: '20px !important',
    textAlign: 'center',
    color: '#3f51b5 !important',
    '& a': {
      color: '#1a237e !important',
      textDecoration: 'none !important',
      fontWeight: 'bold !important',
      '&:hover': {
        textDecoration: 'underline !important',
      },
    },
  },
});

export default SignUpForm;
