import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 280;

// Example user data; in a real app, replace with context or API data
const user = {
  name: "Admin User",
  email: "admin@example.com",
  avatar: "A"
};

// Dashboard statistics - in real app, fetch from API
const dashboardStats = [
  {
    title: "Total Businesses",
    value: "156",
    change: "+12%",
    changeType: "positive",
    icon: <BusinessIcon sx={{ fontSize: 40 }} />,
    color: "#1976d2"
  },
  {
    title: "Active Subscriptions",
    value: "89",
    change: "+8%",
    changeType: "positive", 
    icon: <CreditCardIcon sx={{ fontSize: 40 }} />,
    color: "#2e7d32"
  },
  {
    title: "Total Users",
    value: "2,847",
    change: "+23%",
    changeType: "positive",
    icon: <GroupIcon sx={{ fontSize: 40 }} />,
    color: "#ed6c02"
  },
  {
    title: "System Health",
    value: "99.9%",
    change: "Stable",
    changeType: "neutral",
    icon: <BarChartIcon sx={{ fontSize: 40 }} />,
    color: "#9c27b0"
  }
];

const mainOptions = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    key: 'dashboard',
  },
  {
    label: 'Manage Business',
    icon: <BusinessIcon />,
    key: 'business',
  },
  {
    label: 'Manage Subscriptions',
    icon: <CreditCardIcon />,
    key: 'subscriptions',
  },
  {
    label: 'User Management',
    icon: <GroupIcon />,
    key: 'users',
  },
  {
    label: 'Analytics',
    icon: <BarChartIcon />,
    key: 'analytics',
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    key: 'settings',
  },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState('dashboard');

  // Menu for account details and logout
  const [anchorEl, setAnchorEl] = useState(null);
  const accountMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (key) => {
    setSelected(key);
  };

  const handleAccountMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement actual logout logic here, e.g. calling auth context or redirecting
    alert('Logged out!');
    handleAccountMenuClose();
    navigate('/');
  };

  const drawer = (
    <Box sx={{ 
      height: '100%',
      background: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
      color: 'white'
    }}>
      <Toolbar sx={{ 
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        mb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Avatar 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              mr: 2,
              width: 40,
              height: 40
            }}
          >
            A
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
              SmartBiz
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Admin Portal
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      
      <List sx={{ px: 2 }}>
        {mainOptions.map((option) => (
          <ListItem 
            key={option.key}
            onClick={() => handleMenuClick(option.key)}
            sx={{
              borderRadius: 2,
              mb: 1,
              cursor: 'pointer',
              backgroundColor: selected === option.key ? 'rgba(255,255,255,0.15)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {option.icon}
            </ListItemIcon>
            <ListItemText 
              primary={option.label}
              primaryTypographyProps={{
                fontWeight: selected === option.key ? 600 : 400
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderDashboardContent = () => {
    if (selected === 'dashboard') {
      return (
        <Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 700, 
            mb: 3,
            background: 'linear-gradient(45deg, #1e3c72, #2a5298)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Admin Dashboard
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {dashboardStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%',
                  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {stat.title}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: stat.changeType === 'positive' ? '#2e7d32' : 
                                   stat.changeType === 'negative' ? '#d32f2f' : '#666',
                            fontWeight: 600
                          }}
                        >
                          {stat.change}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        color: stat.color,
                        opacity: 0.8
                      }}>
                        {stat.icon}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, height: 400 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Recent Activity
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: 300,
                  color: 'text.secondary'
                }}>
                  <Typography>Activity chart would go here</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: 400 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<AddCircleOutlineIcon />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Add New Business
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<GroupIcon />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Manage Users
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<BarChartIcon />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    View Analytics
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<SettingsIcon />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    System Settings
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      );
    }

    return (
      <Box>
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          mb: 3,
          background: 'linear-gradient(45deg, #1e3c72, #2a5298)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {mainOptions.find(opt => opt.key === selected)?.label}
        </Typography>
        <Paper sx={{ p: 4, textAlign: 'center', minHeight: 400 }}>
          <Typography variant="h6" color="text.secondary">
            {mainOptions.find(opt => opt.key === selected)?.label} content will be implemented here
          </Typography>
        </Paper>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 600 }}>
            SmartBiz Admin
          </Typography>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <NotificationsIcon />
          </IconButton>
          {/* Account icon/menu at top right */}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="account"
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleAccountMenuOpen}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={accountMenuOpen}
            onClose={handleAccountMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: 2,
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
              }
            }}
          >
            <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ mr: 2, bgcolor: '#1e3c72' }}>
                  {user.avatar}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 3 }}>
              <LogoutIcon sx={{ mr: 2, color: '#d32f2f' }} /> 
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="admin dashboard folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              border: 'none'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              border: 'none'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          bgcolor: '#f5f5f5',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        {renderDashboardContent()}
      </Box>
    </Box>
  );
}

export default AdminDashboard;