import { SvgIcon } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUserAPI } from '~/apis';
import { ReactComponent as TrelloIcon } from '~/assets/Trello.svg';
import { GoogleIcon } from './components/CustomIcons';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [passwordCfError, setPasswordCfError] = React.useState(false);
  const [passwordCfErrorMessage, setPasswordCfErrorMessage] = React.useState('');

  const { register, handleSubmit } = useForm()

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password_cf = document.getElementById('password_cf');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || !/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/.test(password.value)) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must include at least 1 letter, a number, and at least 8 characters.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (password.value !== password_cf.value) {
      setPasswordCfError(true);
      setPasswordCfErrorMessage('Passwords do not match.');
      isValid = false;
    } else {
      setPasswordCfError(false);
      setPasswordCfErrorMessage('');
    }


    return isValid;
  };

  const navigate = useNavigate()

  const handleSubmit_2 = (data) => {
    if (emailError || passwordError || passwordCfError) return
    const { email, password } = data

    toast.promise(
      registerUserAPI({ email, password }),
      { pending: 'Registation in process ...' }
    ).then(user => {
      navigate(`/Login?registerEmail=${user.email}`)
    })


  };

  return (
    <Box {...props} >
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize='medium' sx={{ color: 'primary.main', fontSize: "1.5rem" }} />
            <Typography sx={{ fontSize: "1.5 rem", fontWeight: "bold", color: "primary.light" }}>Trello</Typography>
          </Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleSubmit_2)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                {...register('email')}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                {...register('password')}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password Confirm</FormLabel>
              <TextField
                required
                fullWidth
                name="password_cf"
                placeholder="••••••"
                type="password"
                id="password_cf"
                autoComplete="new-password"
                variant="outlined"
                error={passwordCfError}
                helperText={passwordCfErrorMessage}
                color={passwordCfError ? 'error' : 'primary'}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              sx={{
                mt: 3,

                borderRadius: "12px",
                fontSize: "1rem",
                backgroundImage: "radial-gradient(circle, #ff7eb3, #841584)",
                color: "white",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundImage: "radial-gradient(circle, #841584, #ff7eb3)",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>

            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                to="/login"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </Box>
  );
}
