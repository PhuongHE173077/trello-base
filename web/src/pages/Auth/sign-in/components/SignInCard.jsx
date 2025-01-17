import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from "~/Utils/validators";
import { ReactComponent as TrelloIcon } from '~/assets/Trello.svg';
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { GoogleIcon } from "../icons/CustomIcon";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserAPI } from "~/redux/user/userSlice";
import { toast } from "react-toastify";


const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(5),
  gap: theme.spacing(2.5),
  boxShadow:
    "0px 10px 25px rgba(0, 0, 0, 0.05), 0px 20px 40px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    width: "500px",
  },
}));

const Login = () => {
  let [searchParams] = useSearchParams()

  const registerEmail = searchParams.get('registerEmail')
  const verifyEmail = searchParams.get('verifyEmail')

  const { register, handleSubmit, formState: { errors } } = useForm()

  const dispath = useDispatch()
  const navigate = useNavigate()

  const submitLogin = (data) => {
    const { email, password } = data

    toast.promise(
      dispath(loginUserAPI({ email, password })),
      { pending: 'Login in process ...' }
    ).then(res => {
      console.log("🚀 ~ submitLogin ~ res:", res)
      if (!res.error) {
        navigate('/')
      }
    })


  }

  return (
    <Card variant="outlined">

      <Box sx={{ display: { xs: "flex", md: "none" } }}>

      </Box>
      <Box sx={{ display: { xs: "none", md: "flex", alignItems: 'center' } }}>
        <SvgIcon component={TrelloIcon} inheritViewBox fontSize='medium' sx={{ color: 'primary.main', fontSize: "2.5rem" }} />

        <Typography sx={{ fontSize: "2.5rem", fontWeight: "bold", color: "primary.dark" }}>Trello</Typography>
      </Box>

      <form style={{ width: "100%" }} onSubmit={handleSubmit(submitLogin)}>
        <Stack spacing={2}>
          {registerEmail &&
            <Alert severity="info">
              There are an mail send to <Typography sx={{ fontWeight: "bold", '&:hover': { color: '#0abde3' } }} component='span' style={{ cursor: 'pointer' }}>{registerEmail}</Typography>. Please verify your email.
            </Alert>
          }
          {verifyEmail &&
            <Alert severity="success">
              Your mail <Typography sx={{ fontWeight: "bold", '&:hover': { color: '#0abde3' } }} component='span' style={{ cursor: 'pointer' }}>{verifyEmail} </Typography>has been verified. Now you can login to service.
            </Alert>
          }

          <Box>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              autoFocus

              placeholder="your@email.com"
              {...register('email', {
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                }
              })}
              InputProps={{ style: { borderRadius: "12px" } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#0097e6' },
                  '&:hover fieldset': { borderColor: '#0097e6' },
                  '&.Mui-focused fieldset': { borderColor: '#0097e6' },
                }
              }}
            />
            <FieldErrorAlert errors={errors} fieldName={'email'} />
          </Box>

          <Box>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              placeholder="••••••"
              InputProps={{ style: { borderRadius: "12px" } }}
              {...register('password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
              sx={

                errors.password ? {
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'red' },
                    '&:hover fieldset': { borderColor: 'red' },
                    '&.Mui-focused fieldset': { borderColor: 'red' },
                  }
                } : {
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#0097e6' },
                    '&:hover fieldset': { borderColor: '#0097e6' },
                    '&.Mui-focused fieldset': { borderColor: '#0097e6' },
                  },
                }

              }
            />
            <FieldErrorAlert errors={errors} fieldName={'password'} />

          </Box>

          <Link
            component="button"
            type="button"
            variant="body2"
            sx={{ alignSelf: "flex-end", mt: 1 }}
          >
            Forgot Password?
          </Link>
        </Stack>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "12px",
            fontSize: "1rem",
            backgroundImage: "radial-gradient(circle, #ff7eb3, #841584)",
            color: "white",
            transition: "all 0.3s ease-in-out", // Chuyển động mượt mà
            "&:hover": {
              backgroundImage: "radial-gradient(circle, #841584, #ff7eb3)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Sign in
        </Button>
      </form>
      <Typography sx={{ textAlign: 'center' }}>
        Don&apos;t have an account?{' '}
        <span>
          <Link
            href="/register"
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Sign up
          </Link>
        </span>
      </Typography>
      <Divider sx={{ mt: 3, mb: 1 }}>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
          sx={{ borderRadius: "12px", py: 1.5 }}
        >
          Sign in with Google
        </Button>
      </Box>


    </Card>
  );
};

export default Login;
