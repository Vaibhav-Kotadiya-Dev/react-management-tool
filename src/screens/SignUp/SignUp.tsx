import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff, Email, Person } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const SignUpForm = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log('Sign Up:', { firstName, lastName, email, password });
    } else {
      console.error('Passwords do not match');
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
            className={classes.textField}
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
            className={classes.textField}
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
            className={classes.textField}
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
            className={classes.textField}
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
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={classes.textField}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" className={classes.switchText}>
          Already have an account? <Link href="/login">Login</Link>
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