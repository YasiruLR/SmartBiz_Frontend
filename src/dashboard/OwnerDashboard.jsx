import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
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
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Paper,
  Divider,
  Button,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';


// Example user data; in a real app, replace with context or API data
const user = {
  name: "Owner User",
  email: "owner@example.com",
  avatar: "/api/placeholder/40/40",
  role: "Business Owner"
};

// Dashboard stats data
const dashboardStats = [
  {
    title: "Total Revenue",
    value: "$24,500",
    change: "+12.5%",
    color: "#4caf50",
    icon: <TrendingUpIcon />,
    trend: "up"
  },
  {
    title: "Active Customers",
    value: "1,248",
    change: "+8.2%",
    color: "#2196f3",
    icon: <PeopleIcon />,
    trend: "up"
  },
  {
    title: "Orders Today",
    value: "156",
    change: "-2.1%",
    color: "#ff9800",
    icon: <ShoppingCartIcon />,
    trend: "down"
  },
  {
    title: "Stock Items",
    value: "2,847",
    change: "+5.7%",
    color: "#9c27b0",
    icon: <InventoryIcon />,
    trend: "up"
  }
];

const drawerWidth = 280;

const mainOptions = [
  {
    label: 'Dashboard Overview',
    icon: <DashboardIcon />,
    key: 'dashboard',
    hasSubmenu: false,
  },
  {
    label: 'Manage Business',
    icon: <BusinessIcon />,
    key: 'business',
    hasSubmenu: true,
  },
  {
    label: 'Manage Customer',
    icon: <PeopleIcon />,
    key: 'customer',
    hasSubmenu: true,
  },
  {
    label: 'Manage Stocks',
    icon: <InventoryIcon />,
    key: 'stocks',
    hasSubmenu: true,
  },
  {
    label: 'Manage Orders',
    icon: <ShoppingCartIcon />,
    key: 'orders',
    hasSubmenu: true,
  },
  {
    label: 'Manage Employee',
    icon: <BadgeIcon />,
    key: 'employee',
    hasSubmenu: true,
  },
  {
    label: 'Manage Suppliers',
    icon: <LocalShippingIcon />,
    key: 'suppliers',
    hasSubmenu: true,
  },
];

const crudOptions = [
  {
    label: 'Create',
    icon: <AddCircleOutlineIcon />,
    key: 'create',
  },
  {
    label: 'Read',
    icon: <VisibilityIcon />,
    key: 'read',
  },
  {
    label: 'Update',
    icon: <EditIcon />,
    key: 'update',
  },
  {
    label: 'Delete',
    icon: <DeleteIcon />,
    key: 'delete',
  },
];

function OwnerDashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const accountMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(mainOptions[0].key);
  const [selected, setSelected] = useState({
    main: mainOptions[0].key,
    crud: crudOptions[0].key,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAccountMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleAccountMenuClose();
    navigate('/');
  };

  const handleExpand = (key) => {
    const option = mainOptions.find(opt => opt.key === key);
    if (option && !option.hasSubmenu) {
      setSelected({ main: key, crud: null });
      return;
    }
    setExpanded(expanded === key ? null : key);
  };

  const handleSelectCrud = (mainKey, crudKey) => {
    setSelected({ main: mainKey, crud: crudKey });
    setExpanded(mainKey);
  };

  // Stats Card Component
  const StatsCard = ({ stat }) => (
    <Card 
      sx={{ 
        height: '100%', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {stat.value}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {stat.title}
            </Typography>
            <Chip 
              label={stat.change}
              size="small"
              sx={{ 
                mt: 1,
                backgroundColor: stat.trend === 'up' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                color: stat.trend === 'up' ? '#4caf50' : '#f44336',
                fontWeight: 'bold'
              }}
            />
          </Box>
          <Box 
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              borderRadius: '50%', 
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {stat.icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  // Dashboard Content Component
  const DashboardContent = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Dashboard Overview
        </Typography>
        <Box display="flex" gap={2}>
          <IconButton color="primary">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="primary">
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>
      
      <Grid container spacing={3} mb={4}>
        {dashboardStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard stat={stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              {[
                { action: "New order received", time: "2 minutes ago", type: "order" },
                { action: "Inventory updated", time: "15 minutes ago", type: "inventory" },
                { action: "New customer registered", time: "1 hour ago", type: "customer" },
                { action: "Payment processed", time: "2 hours ago", type: "payment" }
              ].map((activity, index) => (
                <Box key={index} display="flex" alignItems="center" gap={2} py={1}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    {activity.type === 'order' && <ShoppingCartIcon sx={{ fontSize: 16 }} />}
                    {activity.type === 'inventory' && <InventoryIcon sx={{ fontSize: 16 }} />}
                    {activity.type === 'customer' && <PeopleIcon sx={{ fontSize: 16 }} />}
                    {activity.type === 'payment' && <TrendingUpIcon sx={{ fontSize: 16 }} />}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2">{activity.action}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              {[
                { label: "Add New Product", icon: <AddCircleOutlineIcon />, color: "primary" },
                { label: "View Orders", icon: <ShoppingCartIcon />, color: "success" },
                { label: "Manage Inventory", icon: <InventoryIcon />, color: "warning" },
                { label: "Customer Reports", icon: <PeopleIcon />, color: "info" }
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  startIcon={action.icon}
                  color={action.color}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const drawer = (
    <Box sx={{ height: '100%', background: 'linear-gradient(180deg, #1976d2 0%, #1565c0 100%)' }}>
      <Toolbar sx={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
        <Box display="flex" alignItems="center" gap={2} width="100%">
          <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
            <BusinessIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" color="white">
              SmartBiz
            </Typography>
            <Typography variant="caption" color="rgba(255,255,255,0.8)">
              Owner Portal
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 2, mb: 2, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={user.avatar} sx={{ width: 40, height: 40 }}>
              {user.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="white" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="caption" color="rgba(255,255,255,0.8)">
                {user.role}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <List sx={{ px: 1 }}>
        {mainOptions.map((main) => (
          <React.Fragment key={main.key}>
            <ListItem 
              button 
              onClick={() => handleExpand(main.key)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                mx: 1,
                backgroundColor: selected.main === main.key ? 'rgba(255,255,255,0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {main.icon}
              </ListItemIcon>
              <ListItemText 
                primary={main.label} 
                sx={{ 
                  '& .MuiTypography-root': { 
                    color: 'white', 
                    fontWeight: selected.main === main.key ? 'bold' : 'normal'
                  } 
                }} 
              />
              {main.hasSubmenu && (
                expanded === main.key ? 
                <ExpandLess sx={{ color: 'white' }} /> : 
                <ExpandMore sx={{ color: 'white' }} />
              )}
            </ListItem>
            {main.hasSubmenu && (
              <Collapse in={expanded === main.key} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {crudOptions.map((crud) => (
                    <ListItem
                      button
                      key={crud.key}
                      sx={{ 
                        pl: 6, 
                        borderRadius: 2,
                        mx: 1,
                        backgroundColor: selected.main === main.key && selected.crud === crud.key ? 'rgba(255,255,255,0.15)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        }
                      }}
                      selected={
                        selected.main === main.key && selected.crud === crud.key
                      }
                      onClick={() => handleSelectCrud(main.key, crud.key)}
                    >
                      <ListItemIcon sx={{ color: 'rgba(255,255,255,0.8)', minWidth: 32 }}>
                        {crud.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={crud.label} 
                        sx={{ 
                          '& .MuiTypography-root': { 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '0.875rem',
                            fontWeight: selected.main === main.key && selected.crud === crud.key ? 'bold' : 'normal'
                          } 
                        }} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  const selectedMainLabel =
    mainOptions.find((o) => o.key === selected.main)?.label || '';
  const selectedCrudLabel =
    crudOptions.find((o) => o.key === selected.crud)?.label || '';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
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
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            SmartBiz Owner Dashboard
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="account"
              edge="end"
              onClick={handleAccountMenuOpen}
              sx={{ 
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={accountMenuOpen}
            onClose={handleAccountMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                minWidth: 200
              }
            }}
          >
            <MenuItem disabled sx={{ py: 2 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={user.avatar} sx={{ width: 40, height: 40 }}>
                  {user.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                  <Chip label={user.role} size="small" color="primary" variant="outlined" sx={{ mt: 0.5 }} />
                </Box>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main', py: 1.5 }}>
              <LogoutIcon fontSize="small" sx={{ mr: 2 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="owner dashboard folders"
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
          backgroundColor: '#f8fafc',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        {selected.main === 'dashboard' ? (
          <DashboardContent />
        ) : (
          <Box>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                {selectedMainLabel} {selectedCrudLabel && `- ${selectedCrudLabel}`}
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Box mt={3}>
                <Typography variant="body1" color="text.secondary">
                  Content for <strong>{selectedCrudLabel || 'management'}</strong> in <strong>{selectedMainLabel}</strong> will be implemented here.
                </Typography>
                <Box mt={3} display="flex" gap={2}>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>
                    Add New
                  </Button>
                  <Button variant="outlined" startIcon={<VisibilityIcon />}>
                    View All
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default OwnerDashboard;