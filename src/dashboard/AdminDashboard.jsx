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

const drawerWidth = 260;

// Example user data; in a real app, replace with context or API data
const user = {
  name: "Admin User",
  email: "admin@example.com",
};

const mainOptions = [
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

function AdminDashboard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(mainOptions[0].key);
  const [selected, setSelected] = useState({
    main: mainOptions[0].key,
    crud: crudOptions[0].key,
  });

  // Menu for account details and logout
  const [anchorEl, setAnchorEl] = useState(null);
  const accountMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleExpand = (key) => {
    setExpanded(expanded === key ? null : key);
  };

  const handleSelectCrud = (mainKey, crudKey) => {
    setSelected({ main: mainKey, crud: crudKey });
    setExpanded(mainKey);
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
    <div>
      <Toolbar />
      <List>
        {mainOptions.map((main) => (
          <React.Fragment key={main.key}>
            <ListItem button onClick={() => handleExpand(main.key)}>
              <ListItemIcon>{main.icon}</ListItemIcon>
              <ListItemText primary={main.label} />
              {expanded === main.key ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expanded === main.key} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {crudOptions.map((crud) => (
                  <ListItem
                    button
                    key={crud.key}
                    sx={{ pl: 4 }}
                    selected={
                      selected.main === main.key && selected.crud === crud.key
                    }
                    onClick={() => handleSelectCrud(main.key, crud.key)}
                  >
                    <ListItemIcon>{crud.icon}</ListItemIcon>
                    <ListItemText primary={crud.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  const selectedMainLabel =
    mainOptions.find((o) => o.key === selected.main)?.label || '';
  const selectedCrudLabel =
    crudOptions.find((o) => o.key === selected.crud)?.label || '';

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
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
          >
            <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ mr: 1 }}>{user.name[0]}</Avatar>
              <Box>
                <Typography variant="subtitle1">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {selectedMainLabel} - {selectedCrudLabel}
        </Typography>
        {/* The actual content for each section */}
        <Box mt={2}>
          <Typography>
            {/* Placeholder for selected CRUD operation */}
            Content for <b>{selectedCrudLabel}</b> in <b>{selectedMainLabel}</b> goes here.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboard;