import { Button, Container, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Methods
  const handleRegistration = async () => {
    setIsLoading(true);
    try {
      if (password == confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        alert("Password doesn't match");
        return;
      }
      window.location = "/";
    } catch (error) {
      console.error(error);
      if (error.toString().includes("email-already-in-use")) {
        alert("Account already in use");
      } else if (error.toString().includes("auth/invalid-email")) {
        alert("Invalid email");
      } else if (error.toString().includes("auth/weak-password")) {
        alert("Password should be at least 6 characters");
      } else {
        alert("Something went wrong");
      }
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth='xs'>
      <Typography mt={4} variant='h4'>
        Register
      </Typography>
      <Box
        component='form'
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
        <TextField
          id='outlined-required'
          label='Confirm Password'
          fullWidth
          margin='normal'
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
          type='password'
        />

        <Button
          type='submit'
          disabled={isLoading}
          variant='outlined'
          style={{ marginTop: 16 }}
          fullWidth
          onClick={handleRegistration}>
          <Typography variant='button'>Register</Typography>
        </Button>

        <Typography mt={2}>
          Already have account?{" "}
          <Link
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
