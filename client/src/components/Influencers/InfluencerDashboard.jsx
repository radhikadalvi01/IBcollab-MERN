import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
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
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AdminCards from './AdminCards'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import home from './Assets/home.png'
import search from './Assets/search.png'
import collab from './Assets/collab.png'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import createQuery from './Assets/createQuery.png';
import invitations_img from './Assets/invitations.png';
import Form from 'react-bootstrap/Form';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Card from 'react-bootstrap/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),

  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '150ch',
    },
  },
}));

export default function InfluencerDashboard() {

  const history = useHistory();
  const [userData, setUserData] = useState();
  const [userFname, setUserFname] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userLname, setUserLname] = useState();
  const [userContactNo, setUserContactNo] = useState();
  const [userEngRate, setUserEngRate] = useState();
  const [userFollowers, setUserFollowers] = useState();
  const [userCity, setUserCity] = useState();
  const [userState, setUserState] = useState();
  const [invitationsSent, setInvitationsSent] = useState()
  const [invitationsRecieved, setInvitationsRecieved] = useState();
  const [searchResults, setSearchResults] = useState()
  const [categories, setcategories] = useState();
  const [totalRegisteredBrands, setTotalRegisteredBrands] = useState()

  const [endpoint, setEndpoint] = useState('/brand-dashboard');

  const handleSearchEndpoint = () => {

    setMenu("Search Brands")
    setEndpoint('/influencer-dashboard-search')
  }


  const handleSearch = async (filters) => {
    try {

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(filters)

      })
      const results = await res.json()

      setSearchResults(results)

    } catch (err) {
      console.log(err)
    }
  }


  const [influencerQuery, setInfluencerQuery] = useState({
    from: "",
    entityType: "Influencer",
    contactEmail: "",
    contactNo: "",
    dateOfQuery: "",
    status: "pending",
    query: ""

  });

  const [filters, setFilters] = useState({
    text: "",
    companySize: "",
    city: "",
    state: "",
    filterCategories: []
  })

  const [checkedCategories, setCheckedCategories] = useState([]);

  const handleCategoryCheck = (event) => {
    const categoryName = event.target.name;
    if (event.target.checked) {
      setCheckedCategories([...checkedCategories, categoryName]);
    } else {
      setCheckedCategories(checkedCategories.filter(cat => cat !== categoryName));
    }
  }

  let name1, value1;
  const handlechange = (e) => {
    name1 = e.target.name;
    value1 = e.target.value;

    setFilters({ ...filters, [name1]: value1 });
  }
  filters.filterCategories = checkedCategories

  let profileData = [userData, categories]



  influencerQuery.from = userFname + " " + userLname
  influencerQuery.contactNo = userContactNo
  influencerQuery.contactEmail = userEmail
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  influencerQuery.dateOfQuery = formattedDate

  const handleSubmit = async () => {

    const { from, entityType, contactNo, contactEmail, dateOfQuery, status, query } = influencerQuery;
    const response = await fetch('/influencer-dashboard', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from, entityType, contactNo, contactEmail, dateOfQuery, status, query
      })

    });
    const data = await response.json();
    if (response.status === 422 || !data) {
      window.alert("Query Not submitted")

    } else if (response.status === 201) {
      window.alert("Query submitted successfully")
    }

  }

  let name, value;
  const handleQuerychange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setInfluencerQuery({ ...influencerQuery, [name]: value });
  }

  const callDashboard = async () => {
    try {
      const res = await fetch('/influencer-dashboard', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      console.log(data)

      setUserData(data[0])
      setUserFname(data[0].fname)
      setUserLname(data[0].lname)
      setUserEmail(data[0].email)
      setUserContactNo(data[0].contactNo)
      setSearchResults(data[1])
      setUserEngRate(data[0].engagementRate)
      setUserState(data[0].state)
      setUserCity(data[0].city)
      setUserFollowers(data[0].followers)
      setcategories(data[2])
      setTotalRegisteredBrands(data[3])
      setInvitationsRecieved(data[4])
      setInvitationsSent(data[5])
      if (!res.status === 200) {
        console.log("Error")
        const error = new Error(res.error)
        throw error;
      }
    } catch (err) {
      console.log(err)
      history.push("/influencer-login")
    }
  }

  const openProfilePage = () => {
    history.push({
      pathname: '/influencer-profile-page',
      state: { profileData }
    })
  }

  const handleProfileClick = () => {
    handleMenuClose();
    openProfilePage();
  }

  useEffect(() => {
    callDashboard();
  }, []);



  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));




  const openLogoutPage = () => {
    history.push('/influencer-logout')
  }

  const handleLogoutClick = () => {
    handleMenuClose();
    openLogoutPage();
  }

  const [menu, setMenu] = useState("Home")


  //Side Menu

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
    </Menu>
  );



  const [NotificationanchorEl, setNotificationAnchorEl] = React.useState(null);
  const [NotificationmobileMoreAnchorEl, setNotificationMobileMoreAnchorEl] = React.useState(null);

  const isNotificationMenuOpen = Boolean(NotificationanchorEl);
  const isNotificationMobileMenuOpen = Boolean(NotificationmobileMoreAnchorEl);

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMobileMenuClose = () => {
    setNotificationMobileMoreAnchorEl(null);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
    handleNotificationMobileMenuClose();
  };

  const handleNotificationMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const NotificationmenuId = 'primary-search-account-menu';

  const renderNotificationMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={NotificationmenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationMenuOpen}
      onClose={handleNotificationMenuClose}
    >
      <MenuItem onClick={handleNotificationMenuClose}>
        <Typography>ABC -</Typography>
        <Typography>&nbsp;has invited you for a collab</Typography>
        <Button variant="outlined" size="small">
          View
        </Button>
      </MenuItem>
      <MenuItem onClick={handleNotificationMenuClose}></MenuItem>
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

      <MenuItem onClick={handleNotificationMenuOpen}>
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



  // Main menu vertical bar
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [invitations, setInvitations] = useState({
    to: [],
    from: [],
    status: 0
  })

  

  const [invitationsRecieved2, setInvitationsRecieved2] = useState([
    // initial array of invitations
  ]);
  const [buttonDisabled, setButtonDisabled] = useState(
    Array(invitationsRecieved2.length).fill(false)
  );

  const handleButtonClick = (index, status) => {
    setButtonDisabled((prevState) =>
      prevState.map((val, i) => (i === index ? true : val))
    );
    fetch(`your-backend-url/${invitationsRecieved2[index].id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      // handle the response as needed
    });
  };




  const handleInvite = async (index, email, companyType, companySize, city, state, company) => {

    setSearchResults((prevResults) =>
      prevResults.map((influencer, i) =>
        i === index ? { ...influencer, invited: true } : influencer
      )
    );

    invitations.to[0] = email
    invitations.to[1] = "Brand"
    invitations.to[2] = companySize
    invitations.to[3] = companyType
    invitations.to[4] = city
    invitations.to[5] = state
    invitations.to[6] = company

    invitations.from[0] = userEmail
    invitations.from[1] = "Influencer"
    invitations.from[2] = userEngRate
    invitations.from[3] = userFollowers
    invitations.from[4] = userCity
    invitations.from[5] = userState
    invitations.from[6] = userFname
    invitations.from[7] = userLname

    console.log(invitations)

    const response = await fetch('/influencer-dashboard-invite', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(invitations)

    });
    const data = await response.json();
    if (response.status === 422 || !data) {
      window.alert("Could not Send Invitation")
    } else if (response.status === 201) {
      window.alert("Invitation sent successfully")
    }
  };

  return (
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
              IB Collab - Influencer
            </Typography>

          </Toolbar>
          <Toolbar className='admin-toolbox'>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

              <IconButton size="large" color="inherit"
                edge="end"
                aria-label="account of current user"
                aria-controls={NotificationmenuId}
                aria-haspopup="true"
                onClick={handleNotificationMobileMenuOpen}>
                <Badge badgeContent={5} color="error">
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
          {renderNotificationMenu}
        </div>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
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

          <ListItem disablePadding sx={{ display: 'block' }} onClick={handleSearchEndpoint}>
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
                <img src={search} width={25} />
              </ListItemIcon>

              <ListItemText primary="Search Brands" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("Invitations")} >
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
                <img src={invitations_img} width={25} />
              </ListItemIcon>

              <ListItemText primary="Invitations" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("My collabarations")}>
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
                <img src={collab} width={25} />
              </ListItemIcon>

              <ListItemText primary="My Collabarations" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("Query")} >
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
                <img src={createQuery} width={25} />
              </ListItemIcon>

              <ListItemText primary="Query" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {menu === 'Home' && <>

          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={4}>
              <AdminCards number={totalRegisteredBrands} title={"Total Registered Brands"} color={'#ff5722'} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AdminCards number={14} title={"Invitations Recieved"} color={'#999999'} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AdminCards number={5} title={"Total Collabs Successful"} color={'#999999'} />
            </Grid>
          </Grid>

        </>}

        {menu === 'Search Brands' && <>

          <Box sx={{ flexGrow: 1 }}>
            <div className='search'>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search Influencer by name, followers, engagement rate etc" inputProps={{ 'aria-label': 'search' }}
                  onChange={handlechange}
                  name='text'
                  value={filters.text}
                />
              </Search>
            </div>
            <div className="search-btn">
                <Button variant="contained" onClick={() => handleSearch(filters)} >Search</Button>
              </div>
            <p></p>
            <p></p>
            <p className="text-muted mb-1">Recommended for you</p>
            <p></p>
            <div>
              <div className='Results'>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>

                  {searchResults.map((brand, index) => (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                      <MDBCard className="mb-4">
                        <MDBCardBody className="text-center">
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: '150px' }}
                            fluid />
                          <p></p>
                          <p className="text-muted mb-1">{brand.company}</p>
                          <p className="text-muted mb-1">{brand.companyType}</p>
                          <p className="text-muted mb-4">{brand.city + ", " + brand.state}</p>
                          <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                            <MDBCardText className="font-italic mb-1">Size: {brand.companySize} </MDBCardText>
                          </div>
                          <p></p>
                          <div className="d-flex justify-content-center mb-2">
                            {brand.invited ? (
                              <MDBBtn disabled>Invited</MDBBtn>
                            ) : (
                              <MDBBtn onClick={() => handleInvite(index, brand.companyEmail, brand.companyType, brand.companySize, brand.city, brand.state, brand.company)}>Invite</MDBBtn>
                            )}
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </Grid>
                  ))}
                </Grid>

              </div>
              <div className='Filters'>
                <FormGroup>
                  <Form.Label>Company Size</Form.Label>
                  <Form.Select
                    value={filters.companySize}
                    onChange={handlechange}
                    name="companySize"
                    required
                    className='drop-down'
                  >
                    <option value={null} >Choose Size</option>
                    <option value='Micro(1-50)'>Micro(1-50)</option>
                    <option value='Small(51-500)'>Small(51-500)</option>
                    <option value='Medium(501-5000)'>Medium(501-5000)</option>
                    <option value='Large(5001-1000)'>Large(5001-1000)</option>
                    <option value='Mega(10,000+)'>Mega(10,000+)</option>
                  </Form.Select>
                  <p></p>
                  <TextField label="Filter by City" name='city' value={filters.city} id="outlined-size-small" size="small" onChange={handlechange} />
                  <p></p>
                  <TextField label="Filter by State" name='state' value={filters.state} id="outlined-size-small" size="small" onChange={handlechange} />
                  <p></p>

                  {categories.map((cat, index) => (
                    <FormControlLabel control={<Checkbox onChange={handleCategoryCheck} name={cat.category} />} label={cat.category} key={index} />
                  ))}

                </FormGroup>
              </div>
            </div>
          </Box>
        </>}

        {menu === 'Invitations' && <>
          <div>
            <h3>Invitations Recieved</h3>
            <div>
              {invitationsRecieved && invitationsRecieved.length > 0 ? (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                  {invitationsRecieved.map((invitation, index) => (
                    <Grid item xs={12} md={4}>
                      <Card sx={{ maxWidth: 55 }}>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            Sent to: {" " + invitation.to[6]}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Company Type: {" " + invitation.to[3]}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            company Size: {" " + invitation.to[2]}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Location: {" " + invitation.to[4] + ", " + invitation.to[5]}
                          </Typography>
                          {invitation.status === 1 ? (
                            <Typography
                              sx={{ mb: 1.5 }}
                              color="text.secondary"
                              variant="body2"
                            >
                              Accepted
                            </Typography>
                          ) : invitation.status === -1 ? (
                            <Typography
                              sx={{ mb: 1.5 }}
                              color="text.secondary"
                              variant="body2"
                            >
                              Rejected
                            </Typography>
                          ) : (
                            <>
                              <CardActions>
                                <Button
                                  size="small"
                                  onClick={() => handleButtonClick(index, 1)}
                                  disabled={buttonDisabled[index]}
                                >
                                  Accept
                                </Button>
                              </CardActions>
                              <CardActions>
                                <Button
                                  size="small"
                                  onClick={() => handleButtonClick(index, -1)}
                                  disabled={buttonDisabled[index]}
                                >
                                  Reject
                                </Button>
                              </CardActions>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

              ) : (
                <Typography variant="h6" component="div">
                  Invitations not Recieved
                </Typography>
              )}
            </div>
            <br />
            <h3>Invitations Sent</h3>
            <div>
              {invitationsSent && invitationsSent.length > 0 ? (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                  {invitationsSent.map((invitation) => (
                    <Grid item xs={12} md={4}>
                      <Card sx={{ maxWidth: 55 }}>
                        <CardContent>
                        <Typography variant="h6" component="div">
                            Sent to: {" " + invitation.to[6]}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Company Type: {" " + invitation.to[3]}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            company Size: {" " + invitation.to[2]}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Location: {" " + invitation.to[4] + ", " + invitation.to[5]}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Status: {invitation.status === 1 ? 'Accepted' : invitation.status === 0 ? 'Pending' : 'Rejected'}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

              ) : (
                <Typography variant="h6" component="div">
                  Invitations not sent
                </Typography>
              )}
            </div>
          </div>

        </>}

        {menu === 'My collabarations' && <>
          <Card style={{ width: '36rem' }}>
            <Card.Header>Post</Card.Header>
            <Card.Body>
              <Card.Title>Kylie Jenner</Card.Title>
              <Card.Text>Product Name: Eye Shadow Pallete</Card.Text>
              <Card.Text>Sent on: 1-9-22</Card.Text>
              <Card.Text>Post on: 8-9-22</Card.Text>
              <Card.Text>Amount: 500000</Card.Text>
              <Card.Text>Status: Pending</Card.Text>
              <Button>Go somewhere</Button>
            </Card.Body>
          </Card>
        </>}

        {menu === 'Query' && <>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control type="email" value={userEmail} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" value={userContactNo} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Your Query</Form.Label>
              <Form.Control as="textarea" rows={10} name="query" onChange={handleQuerychange} value={influencerQuery.query} />
            </Form.Group>
            <Button variant="contained" size="large" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </>}


      </Box>


    </Box >
  );
}