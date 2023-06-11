import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import home from './Assets/home.png'
import brandgrey from './Assets/brand-grey.png'
import influencergrey from './Assets/influencer-grey.png'
import category_img from './Assets/category.png'
import reportsgrey from './Assets/reports-grey.png'
import AdminCards from './AdminCards'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useHistory } from "react-router-dom"
import { useState, useEffect } from 'react';
import queries from './Assets/queries.png';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody } from '@mui/material'
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function AdminDashboard() {

  //UseState Declarations

  const history = useHistory();
  const themes = useTheme();
  const [filteredBrands, setFilteredBrands] = useState([])
  const [filteredinfluencers, setFilteredInfluencers] = useState([])
  const [totalBrands, setTotalBrands] = useState([])
  const [totalInfluencers, setTotalInfluencers] = useState([])
  const [combinedResult, setCombinedResult] = useState([])
  const [category, setcategory] = useState("");
  const [AcceptedQueries, setAcceptedQueries] = useState([])
  const [NAQueries, setNAQueries] = useState([])
  const [subCategory, setSubCategory] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [menu, setMenu] = useState("Home")

  useEffect(() => {
    fetch('/admin-dashboard').then((result) => {
      result.json().then((response) => {
        setCombinedResult(response)
        setTotalBrands(response[0].length)
        setTotalInfluencers(response[1].length)
        setFilteredBrands(response[0].filter(row => row.accepted == 0))
        setFilteredInfluencers(response[1].filter(row => row.accepted == 0))
        setAcceptedQueries(response[2])
        setNAQueries(response[2].filter(row => row.accepted == 0))
      })
    });
  }, [])

  //Add SubCategory

  const handleChange = (e) => {
    e.preventDefault();
    setcategory(e.target.value);
  }

  const handleSubCatChange = (event) => {
    const {
      target: { value },
    } = event;
    setSubCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = async () => {

    const response = await fetch('/admin-dashboard', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category, subCategory
      })

    });

    const data = await response.json();

    if (response.status === 422 || !data) {
      window.alert("Category OR SubCategory Already Exists")

    } else if (response.status === 400) {
      window.alert("Please Enter Data")

    } else if (response.status === 201) {
      window.alert("Categories submitted successully")
    }
  }

  // _____________________________________________________________________ //

  //Admin Authentication


  const handleAccept = (id) => {
    fetch(`/admin-dashboard/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // sending the ID as an object
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    fetch(`/admin-dashboard/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // sending the ID as an object
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    handleClose();
  };

//_________________________________________________________________________________//


//Log Out

  const logOut = () => {
    history.push({
      pathname: '/admin-logout'
    })
  }

  const handleLogout = () => {
    handleMenuClose();
    logOut();
  }

//__________________________________________________________________________________//

  //Side Menu

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  //_____________________________________________________________________________________//


  // Main menu vertical bar
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [show, setShow] = useState(false);
  const [idToBeDeleted, setID] = useState()

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    console.log("called")
    setID(id)
    setShow(true)
  };

  //___________________________________________________________________________________________//

  return (
    <div className="AdminDashboard">


      <Modal show={show} onHide={handleClose} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>Delete Influencer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Want To DELETE This Record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => handleDelete(idToBeDeleted)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} className='admin-appbar'>
          <div>
            <Toolbar className='toolbox'>
              <IconButton
                color="inherit"
                aria-label="open drawer"

                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                IB Collab - Admin
              </Typography>

            </Toolbar>
            <Toolbar className='admin-toolbox'>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton size="large" color="inherit">
                  <Badge badgeContent={n1} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  color="inherit"
                >
                  <Badge badgeContent={n2} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
            {renderMobileMenu}
            {renderMenu}
          </div>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {themes.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("Home")}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={home} width={25} />
                </ListItemIcon>

                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("Influencers")}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={influencergrey} width={25} />
                </ListItemIcon>

                <ListItemText primary="Influencers" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("Brands")}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={brandgrey} width={25} />
                </ListItemIcon>

                <ListItemText primary="Brands" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("Collabarations")} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={reportsgrey} width={25} />
                </ListItemIcon>

                <ListItemText primary="Collabarations" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("Category")}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={category_img} width={25} />
                </ListItemIcon>

                <ListItemText primary="Categories" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("Query")}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={queries} width={25} />
                </ListItemIcon>

                <ListItemText primary="Queries" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

          </List>

        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />

          {menu === 'Home' && <>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} md={4}>
                <AdminCards number={totalInfluencers} title={"Total Influencers Registered"} color={'#ff5722'} />
              </Grid>
              <Grid item xs={12} md={4}>
                <AdminCards number={totalBrands} title={"Total Brands Registered"} color={'#999999'} />
              </Grid>
              <Grid item xs={12} md={4}>
                <AdminCards number={5} title={"Total Collabarations Successful"} color={'#999999'} />
              </Grid>
            </Grid>

          </>}

          {menu === 'Influencers' && <>



            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Sr No.
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Age
                  </TableCell>
                  <TableCell>
                    Insta ID
                  </TableCell>
                  <TableCell>
                    Insta URL
                  </TableCell>
                  <TableCell>
                    Followers
                  </TableCell>
                  <TableCell>
                    Engagement Rate
                  </TableCell>
                  <TableCell>
                    Email ID
                  </TableCell>
                  <TableCell>
                    Contact No
                  </TableCell>
                  <TableCell>
                    Location
                  </TableCell>
                  <TableCell>

                  </TableCell>
                  <TableCell>

                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredinfluencers.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.fname + ' ' + item.lname}</TableCell>
                    <TableCell>{item.age}</TableCell>
                    <TableCell>{item.instaID}</TableCell>
                    <TableCell><a href={item.instaURL}>{item.instaURL}</a></TableCell>
                    <TableCell>{item.followers}</TableCell>
                    <TableCell>{item.engagementRate}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.contactNo}</TableCell>
                    <TableCell>{item.city + ', ' + item.state}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="success" onClick={() => handleAccept(item._id)}>
                        Accept
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => handleShow(item._id)}>
                        Delete
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>}

          {menu === 'Brands' && <>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Sr No.
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Designation
                  </TableCell>
                  <TableCell>
                    Company
                  </TableCell>
                  <TableCell>
                    Website
                  </TableCell>
                  <TableCell>
                    Type
                  </TableCell>
                  <TableCell>
                    Industry
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Contact No
                  </TableCell>
                  <TableCell>
                    Location
                  </TableCell>
                  <TableCell>

                  </TableCell>
                  <TableCell>

                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBrands.map((item, index) => (

                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.fname + ' ' + item.lname}</TableCell>
                    <TableCell>{item.Designation}</TableCell>
                    <TableCell>{item.company}</TableCell>
                    <TableCell><a href={item.companyWebsite}>{item.companyWebsite}</a></TableCell>
                    <TableCell>{item.companySize}</TableCell>
                    <TableCell>{item.industry}</TableCell>
                    <TableCell>{item.companyEmail}</TableCell>
                    <TableCell>{item.contactNo}</TableCell>
                    <TableCell>{item.city + ', ' + item.state}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="success" onClick={() => handleAccept(item._id)}>
                        Accept
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => handleShow(item._id)}>
                        Delete
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>}

          {menu === 'Collabarations' && <>
            Coming Soon
          </>}

          {menu === 'Category' && <>
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <Typography>Category:</Typography>
              <p></p>
              <TextField fullWidth label="Enter Category" id="fullWidth" required onChange={handleChange} />
              <p></p>
              <p></p>
              <Typography>Sub-Category:</Typography>
              <p></p>
              <TextField
                multiple
                displayEmpty
                value={subCategory}
                onChange={handleSubCatChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Placeholder</em>;
                  }

                  return selected.join(', ');
                }}
              />
              <p></p>
              <Button variant="contained" onClick={handleSubmit}>Submit</Button>

            </Box>
          </>}

          {menu === 'Query' && <>

            <div>

              <div>

                {NAQueries.map((item, index) => (
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>From: {item.from}</Card.Title>
                      <Card.Text>Entity: {item.entityType}</Card.Text>
                      <Card.Text>Date(Raised): {item.dateOfQuery}</Card.Text>
                      <Card.Text>Contact Email: {item.contactEmail}</Card.Text>
                      <Card.Text>Contact No: {item.contactNo}</Card.Text>
                      <Card.Text>Status: Pending</Card.Text>
                    </Card.Body>
                    <Button onClick={() => window.location.href = `mailto:${item.contactEmail}`}>Contact</Button>
                    <Button onClick={handleAccept}>Resolved</Button>
                  </Card>
                ))}


              </div>
              <p></p>

              <div>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  
                    {AcceptedQueries.map((item, index) => (
                      <Grid item xs={12} md={4}>
                      <Card style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title>From: {item.from}</Card.Title>
                          <Card.Text>Entity: {item.entityType}</Card.Text>
                          <Card.Text>Date(Raised): {item.dateOfQuery}</Card.Text>
                          <Card.Text>Contact Email: {item.contactEmail}</Card.Text>
                          <Card.Text>Contact No: {item.contactNo}</Card.Text>

                        </Card.Body>
                      </Card>
                      </Grid>
                    ))}
                    </Grid>
                  </div>
              </div>
            </>}

          </Box>


      </Box >
    </div>
  );
}

