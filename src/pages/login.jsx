import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import net from '../assets/images/net.jpg'; // Adjust the path as necessary

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/app');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${net})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div> {/* Overlay for better contrast */}
      <Card className="relative p-10 w-full max-w-md rounded-3xl shadow-2xl bg-white/90">
        <Typography
          variant="h4"
          className="text-center font-bold text-blue-700 mb-6"
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          className="text-center text-gray-600 mb-6"
        >
          Please sign in to your account
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              className="bg-white"
            />
          </div>
          <div className="mb-6">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              className="bg-white"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="!bg-blue-600 hover:!bg-blue-700 text-white py-3 rounded-xl shadow-md transition duration-300"
          >
            Login
          </Button>
        </form>
        <Typography
          variant="body2"
          className="text-center text-gray-500 mt-4"
        >
          Don't have an account?{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Sign up
          </span>
        </Typography>
      </Card>
    </div>
  );
};

export default Login;