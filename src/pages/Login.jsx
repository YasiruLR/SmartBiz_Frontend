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
  Tooltip,
  Zoom,
} from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SparklesTwoToneIcon from '@mui/icons-material/AutoAwesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const roleApiMap = {
  admin: 'http://localhost:8080/api/auth/login/admin',
  owner: 'http://localhost:8080/api/auth/login/owner',
  employee: 'http://localhost:8080/api/auth/login/employee',
};

const roleConfig = {
  admin: {
    label: 'Admin',
    icon: <AdminPanelSettingsIcon fontSize="large" />,
    color: '#23408e',
    btnColor: 'linear-gradient(90deg,#0a2540 0%,#3b82f6 100%)',
    shadow: '#3b82f633',
  },
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

export default function Login() {
  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(roleApiMap[role], { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      if (role === 'admin') navigate('/dashboard/admin');
      else if (role === 'owner') navigate('/dashboard/owner');
      else if (role === 'employee') navigate('/dashboard/employee');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
          p: { xs: 2, sm: 4 },
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
            width: 86,
            height: 86,
            mb: 2,
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
          variant="h3"
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
          variant="subtitle1"
          sx={{
            mb: 1.5,
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
            Intelligent Business Management Platform
          </span>
        </Typography>
        <Typography
          variant="body2"
          color={subtitleColor}
          sx={{ mb: 1, textAlign: 'center', fontWeight: 500 }}
        >
          Select your role to continue
        </Typography>
        {/* Role select buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          {Object.entries(roleConfig).map(([key, cfg]) => (
            <Tooltip
              key={key}
              title={`Login as ${cfg.label}`}
              arrow
              placement="top"
              TransitionComponent={Zoom}
            >
              <Button
                variant={role === key ? 'contained' : 'outlined'}
                onClick={() => handleRoleChange(key)}
                sx={{
                  px: 2.5,
                  py: 1.2,
                  borderRadius: 5,
                  fontWeight: 700,
                  fontSize: 15,
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
                      ? btnGradient
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
                        ? btnGradient
                        : `${cfg.color}22`,
                    borderColor:
                      role === key
                        ? 'transparent'
                        : cfg.color,
                    color: '#fff',
                  },
                  minWidth: 110,
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
        <form
          onSubmit={handleLogin}
          autoComplete="off"
          style={{ width: '100%' }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="dense"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 5,
                background: '#fff',
                boxShadow: `0 1px 6px 0 ${shadowColor}`,
                border: inputBorder,
                fontFamily: 'Montserrat, Raleway, sans-serif',
                color: '#222',
              },
              '& .MuiInputLabel-root': {
                color: subtitleColor,
              },
            }}
            InputLabelProps={{ sx: { pl: 1 } }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="dense"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 5,
                background: '#fff',
                boxShadow: `0 1px 6px 0 ${shadowColor}`,
                border: inputBorder,
                fontFamily: 'Montserrat, Raleway, sans-serif',
                color: '#222',
              },
              '& .MuiInputLabel-root': {
                color: subtitleColor,
              },
            }}
            InputLabelProps={{ sx: { pl: 1 } }}
          />
          {error && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 1, mb: 1 }}>
              {error}
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
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              fontFamily: 'Montserrat, Raleway, sans-serif',
              transition: 'background .3s',
              position: 'relative',
              overflow: 'hidden'
            }}
            endIcon={<ArrowForwardRoundedIcon />}
          >
            {loading ? 'Signing In...' : `Sign In as ${roleConfig[role].label}`}
          </Button>
        </form>
        <Divider sx={{ my: 2, width: '100%' }} />
        <Typography variant="body2" align="center" sx={{ color: subtitleColor }}>
          Don&apos;t have an account?{' '}
          <Button
            variant="text"
            color="secondary"
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
            }}
            onClick={() => navigate('/register')}
          >
            Create your business account
          </Button>
        </Typography>
        {/* Decorative static sparkles */}
        <Box sx={{
          position: 'absolute',
          bottom: 16,
          right: 26,
          zIndex: 1,
          opacity: 0.10,
        }}>
          <SparklesTwoToneIcon sx={{ color: textColor, fontSize: 38 }} />
        </Box>
      </Paper>
    </Box>
  );
}