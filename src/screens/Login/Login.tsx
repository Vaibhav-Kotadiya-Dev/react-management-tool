import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Email } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import AuthService from 'services/Login'
import LoadingSpinner from 'components/LoadingSpinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import session from 'utils/session';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/User';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    try {
      setLoading(true)
      const response = await AuthService.login({
        email,
        password,
      })

      if (response?.data) {
        session.setValue('token', JSON.stringify(response?.data?.accessToken))
        setLoading(false)
        dispatch(setUser({
          token: response?.data?.accessToken,
          email: response?.data?.user?.email,
          name: (response?.data?.user?.firstName ?? '') + ' ' + (response?.data?.user?.lastName ?? ''),
          slug: response?.data?.user?.slug,
          id: response?.data?.user?.id,
        }))
        navigate('/', { replace: true })
      } else {
        toast.error('Something went wrong!');
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4" className={classes.title}>Login</Typography>
        <form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            disabled={loading}
          >
            {!loading && 'Login'}
            {loading && <LoadingSpinner />}
          </Button>
        </form>
        <Typography variant="body2" className={classes.switchText}>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>
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

export default LoginForm;
