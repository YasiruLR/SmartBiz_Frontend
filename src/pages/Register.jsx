import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Avatar,
  Stack,
  Divider,
  Tooltip
} from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import SparklesTwoToneIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const roleConfig = {
  owner: {
    label: 'Owner',
    icon: <ApartmentIcon fontSize="large" />,
    color: '#43cea2',
    btnColor: 'linear-gradient(90deg,#43cea2 0%,#185a9d 100%)',
    shadow: '#43cea233',
  },
  employee: {
    label: 'Employee',
    icon: <GroupsIcon fontSize="large" />,
    color: '#6C2AD2',
    btnColor: 'linear-gradient(90deg,#6C2AD2 0%,#b224ef 100%)',
    shadow: '#b224ef33',
  },
};

export default function Register() {
  const [role, setRole] = useState('owner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Styles
  const bgGradient = 'linear-gradient(135deg, #7579ff 0%, #b224ef 100%)';
  const cardGradient = 'linear-gradient(120deg,#fff 60%,#f3f5ff 100%)';
  const textColor = roleConfig[role].color;
  const subtitleColor = '#444';
  const inputBorder = `2px solid ${roleConfig[role].color}`;
  const btnGradient = roleConfig[role].btnColor;
  const shadowColor = roleConfig[role].shadow;

  const handleRoleChange = (event, newRole) => {
    if (newRole) setRole(newRole);
    setError('');
    setSuccess('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        email,
        password,
        name,
        role,
      });
      setSuccess('Registration successful!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        width: '100vw',
        height: '100vh',
        background: bgGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        overflow: 'auto',
      }}
    >
      {/* Decorative sparkles */}
      <Box sx={{
        position: 'absolute',
        top: 40,
        left: 60,
        zIndex: 1,
        opacity: 0.10,
      }}>
        <SparklesTwoToneIcon sx={{ color: '#fff', fontSize: 56 }} />
      </Box>
      <Paper
        elevation={6}
        sx={{
          borderRadius: 6,
          background: cardGradient,
          boxShadow: `0 8px 32px 0 ${shadowColor}`,
          width: '98vw',
          maxWidth: 420,
          // Reduced height and vertical padding
          py: 3,
          px: { xs: 2, sm: 4 },
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <Avatar
          sx={{
            bgcolor: textColor,
            width: 64,
            height: 64,
            mb: 1,
            mx: 'auto',
            boxShadow: `0 4px 20px 0 ${shadowColor}`,
            border: `3.5px solid #fff`,
            transition: 'transform .25s',
            transform: 'scale(1.07)',
          }}
        >
          {roleConfig[role].icon}
        </Avatar>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            letterSpacing: 2,
            textAlign: 'center',
            mb: 1,
            color: textColor,
            textShadow: `0 2px 12px ${shadowColor}`,
            fontFamily: 'Montserrat, Raleway, sans-serif',
            userSelect: 'none'
          }}
        >
          SmartBiz
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            textAlign: 'center',
            fontWeight: 500,
            fontFamily: 'Raleway, Montserrat, sans-serif',
            letterSpacing: 2,
            color: subtitleColor,
          }}
        >
          <span style={{
            background: 'linear-gradient(90deg,#3b82f6,#43cea2,#b224ef)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Create Your Business Account
          </span>
        </Typography>
        <Typography
          variant="body2"
          color={subtitleColor}
          sx={{ mb: 1, textAlign: 'center', fontWeight: 500 }}
        >
          Select your role
        </Typography>
        {/* Role select buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          {Object.entries(roleConfig).map(([key, cfg]) => (
            <Tooltip
              key={key}
              title={`Register as ${cfg.label}`}
              arrow
              placement="top"
            >
              <Button
                variant={role === key ? 'contained' : 'outlined'}
                onClick={() => handleRoleChange(null, key)}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 5,
                  fontWeight: 700,
                  fontSize: 14,
                  boxShadow:
                    role === key
                      ? `0 2px 12px 0 ${cfg.shadow}`
                      : undefined,
                  color:
                    role === key
                      ? '#fff'
                      : cfg.color,
                  background:
                    role === key
                      ? cfg.btnColor
                      : undefined,
                  borderColor:
                    role === key
                      ? 'transparent'
                      : cfg.color,
                  transition: 'background .3s, color .3s',
                  textTransform: 'none',
                  '&:hover': {
                    background:
                      role === key
                        ? cfg.btnColor
                        : `${cfg.color}22`,
                    borderColor:
                      role === key
                        ? 'transparent'
                        : cfg.color,
                    color: '#fff',
                  },
                  minWidth: 95,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
                startIcon={cfg.icon}
              >
                {cfg.label}
              </Button>
            </Tooltip>
          ))}
        </Stack>
        <form onSubmit={handleRegister} autoComplete="off" style={{ width: '100%' }}>
          <TextField
            label="Name"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={e => setName(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 5,
                background: '#fff',
                boxShadow: `0 1px 6px 0 ${shadowColor}`,
                border: inputBorder,
                fontFamily: 'Montserrat, Raleway, sans-serif',
                color: '#222',
                fontSize: 14,
                py: 0.5,
              },
              '& .MuiInputLabel-root': {
                color: subtitleColor,
                fontSize: 14,
              },
            }}
            InputLabelProps={{ sx: { pl: 1 } }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 5,
                background: '#fff',
                boxShadow: `0 1px 6px 0 ${shadowColor}`,
                border: inputBorder,
                fontFamily: 'Montserrat, Raleway, sans-serif',
                color: '#222',
                fontSize: 14,
                py: 0.5,
              },
              '& .MuiInputLabel-root': {
                color: subtitleColor,
                fontSize: 14,
              },
            }}
            InputLabelProps={{ sx: { pl: 1 } }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 5,
                background: '#fff',
                boxShadow: `0 1px 6px 0 ${shadowColor}`,
                border: inputBorder,
                fontFamily: 'Montserrat, Raleway, sans-serif',
                color: '#222',
                fontSize: 14,
                py: 0.5,
              },
              '& .MuiInputLabel-root': {
                color: subtitleColor,
                fontSize: 14,
              },
            }}
            InputLabelProps={{ sx: { pl: 1 } }}
          />
          {error && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 1, mb: 1 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" variant="body2" align="center" sx={{ mt: 1, mb: 1 }}>
              {success}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 1,
              mb: 1,
              borderRadius: 5,
              fontWeight: 700,
              letterSpacing: 1,
              boxShadow: `0 2px 10px 0 ${shadowColor}`,
              background: btnGradient,
              color: '#fff',
              textTransform: 'none',
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              fontFamily: 'Montserrat, Raleway, sans-serif',
              transition: 'background .3s',
              position: 'relative',
              overflow: 'hidden',
              py: 1,
              minHeight: 36
            }}
          >
            {loading ? 'Registering...' : `Register as ${roleConfig[role].label}`}
          </Button>
        </form>
        <Divider sx={{ my: 1, width: '100%' }} />
        <Button
          onClick={() => navigate('/')}
          fullWidth
          sx={{
            fontWeight: 600,
            textTransform: 'none',
            fontSize: 15,
            p: 0,
            background: 'none',
            backgroundClip: 'text',
            backgroundImage: 'linear-gradient(90deg,#7579ff,#43cea2,#b224ef)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            minHeight: 30
          }}
        >
          Back to Login
        </Button>
        {/* Decorative static sparkles */}
        <Box sx={{
          position: 'absolute',
          bottom: 16,
          right: 26,
          zIndex: 1,
          opacity: 0.10,
        }}>
          <SparklesTwoToneIcon sx={{ color: textColor, fontSize: 32 }} />
        </Box>
      </Paper>
    </Box>
  );
}