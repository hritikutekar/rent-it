import { Button, Container, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Method
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location = "/";
    } catch (error) {
      console.error("failed to login", error);
      if (error.toString().includes("auth/invalid-email")) {
        alert("Invalid email");
      } else if (error.toString().includes("auth/wrong-password")) {
        alert("Wrong email or password");
      } else if (error.toString().includes("auth/user-not-found")) {
        alert("User not found");
      } else {
        alert("Something went wrong");
      }
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth='xs'>
      <Typography mt={4} variant='h4'>
        Login
      </Typography>
      <Box
        component='form'
        onSubmit={handleLogin}
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'>
        <TextField
          id='outlined-required'
          label='Email'
          fullWidth
          margin='normal'
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          id='outlined-required'
          label='Password'
          fullWidth
          margin='normal'
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type='password'
        />

        <Button
          type='submit'
          disabled={isLoading}
          variant='outlined'
          style={{ marginTop: 16 }}
          fullWidth
          onClick={handleLogin}>
          <Typography variant='button'>Login</Typography>
        </Button>

        <Typography mt={2}>
          Don't have an account?{" "}
          <Link
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/signup")}>
            Create account
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
