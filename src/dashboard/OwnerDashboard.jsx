import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
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


// Get email from localStorage
const user = {
  name: "Owner User",
  email: localStorage.getItem('email') || "owner@example.com",
};

const drawerWidth = 260;

const mainOptions = [
  {
    label: 'Manage Business',
    icon: <BusinessIcon />,
    key: 'business',
  },
  {
    label: 'Manage Customer',
    icon: <PeopleIcon />,
    key: 'customer',
  },
  {
    label: 'Manage Stocks',
    icon: <InventoryIcon />,
    key: 'stocks',
  },
  {
    label: 'Manage Orders',
    icon: <ShoppingCartIcon />,
    key: 'orders',
  },
  {
    label: 'Manage Employee',
    icon: <BadgeIcon />,
    key: 'employee',
  },
  {
    label: 'Manage Suppliers',
    icon: <LocalShippingIcon />,
    key: 'suppliers',
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

  // Supplier CRUD states
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createForm, setCreateForm] = useState({ name: '', email: '', supplyItemDetails: '' });
  const [updateForm, setUpdateForm] = useState({ id: '', name: '', email: '', supplyItemDetails: '' });

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
    setExpanded(expanded === key ? null : key);
  };

  const handleSelectCrud = (mainKey, crudKey) => {
    setSelected({ main: mainKey, crud: crudKey });
    setExpanded(mainKey);
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

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Fetch suppliers for Read
  useEffect(() => {
    if (selected.main === 'suppliers' && selected.crud === 'read') {
      setLoading(true);
      axios.get('http://localhost:8080/api/suppliers', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          setSuppliers(res.data);
          setError('');
        })
        .catch(err => {
          setError(err.response?.data?.message || 'Failed to fetch suppliers');
        })
        .finally(() => setLoading(false));
    }
  }, [selected.main, selected.crud, token]);

  // Create supplier
  const handleCreateSupplier = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:8080/api/suppliers', createForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Supplier created successfully');
      setCreateForm({ name: '', email: '', supplyItemDetails: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create supplier');
    }
    setLoading(false);
  };

  // Update supplier
  const handleUpdateSupplier = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.put(`http://localhost:8080/api/suppliers/${updateForm.id}`, updateForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Supplier updated successfully');
      setUpdateForm({ id: '', name: '', email: '', supplyItemDetails: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update supplier');
    }
    setLoading(false);
  };

  // Delete supplier
  const handleDeleteSupplier = async (id) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.delete(`http://localhost:8080/api/suppliers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Supplier deleted successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete supplier');
    }
    setLoading(false);
  };

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
            Owner Dashboard
          </Typography>
          <IconButton
            color="inherit"
            aria-label="account"
            edge="end"
            onClick={handleAccountMenuOpen}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={accountMenuOpen}
            onClose={handleAccountMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem disabled>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
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
          {/* Supplier CRUD UI */}
          {selected.main === 'suppliers' && selected.crud === 'create' && (
            <form onSubmit={handleCreateSupplier} style={{ maxWidth: 400 }}>
              <Box sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 700 }}>Create Supplier</Typography>
                <TextField label="Name" fullWidth required margin="normal" value={createForm.name} onChange={e => setCreateForm({ ...createForm, name: e.target.value })} sx={{ background: '#fff', borderRadius: 2 }} />
                <TextField label="Email" type="email" fullWidth required margin="normal" value={createForm.email} onChange={e => setCreateForm({ ...createForm, email: e.target.value })} sx={{ background: '#fff', borderRadius: 2 }} />
                <TextField label="Supply Item Details" fullWidth required margin="normal" value={createForm.supplyItemDetails} onChange={e => setCreateForm({ ...createForm, supplyItemDetails: e.target.value })} sx={{ background: '#fff', borderRadius: 2 }} />
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                {success && <Typography color="success.main" variant="body2">{success}</Typography>}
                <Button type="submit" variant="contained" sx={{ mt: 2, background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)', fontWeight: 700, fontSize: 16, borderRadius: 2 }} disabled={loading}>Create</Button>
              </Box>
            </form>
          )}
          {selected.main === 'suppliers' && selected.crud === 'read' && (
            <Box sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)', boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#f57c00', fontWeight: 700 }}>All Suppliers</Typography>
              {loading ? <Typography>Loading...</Typography> : (
                <>
                  {error && <Typography color="error" variant="body2">{error}</Typography>}
                  <ul style={{ paddingLeft: 0 }}>
                    {suppliers.map(supplier => (
                      <li key={supplier.id} style={{ marginBottom: 16, listStyle: 'none', border: '1px solid #ffe082', background: '#fffde7', borderRadius: 8, padding: 12 }}>
                        <Typography sx={{ color: '#1976d2' }}><b>Name:</b> {supplier.name}</Typography>
                        <Typography sx={{ color: '#1976d2' }}><b>Email:</b> {supplier.email}</Typography>
                        <Typography sx={{ color: '#1976d2' }}><b>Supply Item Details:</b> {supplier.supplyItemDetails}</Typography>
                        <Button variant="outlined" color="primary" size="small" sx={{ mr: 1, borderRadius: 2 }} onClick={() => setUpdateForm({ id: supplier.id, name: supplier.name, email: supplier.email, supplyItemDetails: supplier.supplyItemDetails })}>Edit</Button>
                        <Button variant="outlined" color="error" size="small" sx={{ borderRadius: 2 }} onClick={() => handleDeleteSupplier(supplier.id)}>Delete</Button>
                      </li>
                    ))}
                  </ul>
                  {success && <Typography color="success.main" variant="body2">{success}</Typography>}
                </>
              )}
            </Box>
          )}
          {selected.main === 'suppliers' && selected.crud === 'update' && (
            <form onSubmit={handleUpdateSupplier} style={{ maxWidth: 400 }}>
              <Box sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#6a1b9a', fontWeight: 700 }}>Update Supplier</Typography>
                <TextField label="ID" fullWidth required margin="normal" value={updateForm.id} onChange={e => setUpdateForm({ ...updateForm, id: e.target.value })} sx={{ background: '#fff', borderRadius: 2 }} />
                <TextField label="Name" fullWidth required margin="normal" value={updateForm.name} onChange={e => setUpdateForm({ ...updateForm, name: e.target.value })} sx={{ background: '#fff', borderRadius: 2 }} />
                <TextField label="Email" type="email" fullWidth required margin="normal" value={updateForm.email} onChange={e => setUpdateForm({ ...updateForm, email: e.target.value })} sx={{ background: '#fff', borderRadius: 2 }} />
                <TextField label="Supply Item Details" fullWidth required margin="normal" value={updateForm.supplyItemDetails} onChange={e => setUpdateForm({ ...updateForm, supplyItemDetails: e.target.value })} sx={{ background: '#fff', borderRadius: 2 }} />
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                {success && <Typography color="success.main" variant="body2">{success}</Typography>}
                <Button type="submit" variant="contained" sx={{ mt: 2, background: 'linear-gradient(90deg, #6a1b9a 60%, #8ec5fc 100%)', fontWeight: 700, fontSize: 16, borderRadius: 2 }} disabled={loading}>Update</Button>
              </Box>
            </form>
          )}
          {selected.main === 'suppliers' && selected.crud === 'delete' && (
            <Box sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #f8ffae 0%, #43cea2 100%)', boxShadow: 3, maxWidth: 400 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#43cea2', fontWeight: 700 }}>Delete Supplier</Typography>
              <TextField label="Supplier ID" fullWidth required margin="normal" value={updateForm.id} onChange={e => setUpdateForm({ ...updateForm, id: e.target.value })} sx={{ background: '#fff', borderRadius: 2 }} />
              <Button variant="contained" color="error" sx={{ mt: 2, fontWeight: 700, fontSize: 16, borderRadius: 2, background: 'linear-gradient(90deg, #43cea2 60%, #f8ffae 100%)' }} disabled={loading || !updateForm.id} onClick={() => handleDeleteSupplier(updateForm.id)}>Delete</Button>
              {error && <Typography color="error" variant="body2">{error}</Typography>}
              {success && <Typography color="success.main" variant="body2">{success}</Typography>}
            </Box>
          )}
          {/* Default placeholder for other options */}
          {!(selected.main === 'suppliers') && (
            <Typography>
              Content for <b>{selectedCrudLabel}</b> in <b>{selectedMainLabel}</b> goes here.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default OwnerDashboard;