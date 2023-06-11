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
import AdminCards from './AdminCards'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import home from './Assets/home.png'
import search from './Assets/search.png'
import invitations_img from './Assets/invitations.png'
import { useHistory } from "react-router-dom"
import { useState, useEffect, useRef } from 'react';
import createQuery from './Assets/createQuery.png'
import createCollab from './Assets/createCollab.png'
import Form from 'react-bootstrap/Form';
import { MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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



export default function BrandDashboard() {


//__________________________________________________________________________________
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

//___________________________________________________________________________

  
  const history = useHistory();
  const [userData, setUserData] = useState();
  const [userFname, setUserFname] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userLname, setUserLname] = useState();
  const [userContactNo, setUserContactNo] = useState();

  const [categories, setcategories] = useState();
  const [totalRegisteredInfluencers, setTotalRegisteredInfluencers] = useState()
  const [userCompanySize, setUserCompanySize] = useState()
  const [invitationsSent, setInvitationsSent] = useState()
  const [invitationsRecieved, setInvitationsRecieved] = useState();
  const [userCompanyType, setUserCompanyType] = useState()
  const [endpoint, setEndpoint] = useState("")
  const [searchResults, setSearchResults] = useState()

  console.log(invitationsRecieved)
  const handleSearchEndpoint = () => {

    setMenu("Search Influencers")
    setEndpoint('/brand-dashboard-search')
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

  
  const [brandQuery, setBrandQuery] = useState({
    from: "",
    entityType: "Brand",
    contactEmail: "",
    contactNo: "",
    dateOfQuery: "",
    status: "0",
    query: ""

  });

  const [filters, setFilters] = useState({
    text: "",
    engagementRate: "",
    followers: "",
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
  const [isEngagementRateSelected, setIsEngagementRateSelected] = useState(false);
  const [isFollowersSelected, setIsFollowersSelected] = useState(false);
  const [engagementRateValue, setEngagementRateValue] = useState('');
  const [followersValue, setFollowersValue] = useState('');

  const handleEngagementRateSwitchChange = (event) => {
    setIsEngagementRateSelected(event.target.checked);
    if (event.target.checked) {
      setEngagementRateValue(-1);
    } else {
      setEngagementRateValue('');
    }
  }

  const handleFollowersSwitchChange = (event) => {
    setIsFollowersSelected(event.target.checked);
    if (event.target.checked) {
      setFollowersValue(-1);
    } else {
      setFollowersValue('');
    }
  }

  filters.filterCategories = checkedCategories
  filters.engagementRate = engagementRateValue
  filters.followers = followersValue
  let profileData = [userData, categories]

  brandQuery.from = userFname + " " + userLname
  brandQuery.contactNo = userContactNo
  brandQuery.contactEmail = userEmail
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  brandQuery.dateOfQuery = formattedDate

  const handleSubmit = async () => {

    const { from, entityType, contactNo, contactEmail, dateOfQuery, status, query } = brandQuery;
    const response = await fetch('/brand-dashboard', {
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

    setBrandQuery({ ...brandQuery, [name]: value });
  }

  const callDashboard = async () => {
    try {
      const res = await fetch('/brand-dashboard', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();

      setUserData(data[0]);
      setUserFname(data[0].fname)
      setUserLname(data[0].lname)
      setUserEmail(data[0].companyEmail)
      setUserContactNo(data[0].contactNo)
      setUserCompanySize(data[0].companySize)
      setUserCompanyType(data[0].companyType)
      setSearchResults(data[1])
      setcategories(data[2])
      setTotalRegisteredInfluencers(data[3])
      setInvitationsRecieved(data[4])
      setInvitationsSent(data[5])
      
      if (!res.status === 200) {

        const error = new Error(res.error)
        throw error;
      }


    } catch (err) {
      console.log(err)
      history.push("/brand-login")
    }
  }

  const openProfilePage = () => {
    history.push({
      pathname: '/brand-profile-page',
      state: { profileData }
    })
  }

  const handleProfileClick = () => {
    handleMenuClose();
    openProfilePage();
  }

  const openLogoutPage = () => {
    history.push('/brand-logout')
  }

  const handleLogoutClick = () => {
    handleMenuClose();
    openLogoutPage();
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

  const [menu, setMenu] = useState("Home")

  //Side Menu

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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



  const [invitations, setInvitations] = useState({
    to: [],
    from: [],
    status: 0
  })

  invitations.from[0] = userEmail
  invitations.from[1] = "Brand"


  const handleInvite = async (index, email, engagementRate, followers, city, state, fname, lname) => {

    setSearchResults((prevResults) =>
      prevResults.map((influencer, i) =>
        i === index ? { ...influencer, invited: true } : influencer
      )
    );

    invitations.to[0] = email
    invitations.to[1] = "Influencer"
    invitations.to[2] = engagementRate
    invitations.to[3] = followers
    invitations.to[4] = city
    invitations.to[5] = state
    invitations.to[6] = fname
    invitations.to[7] = lname

    invitations.from[2] = userCompanySize
    invitations.from[3] = userCompanyType


    const response = await fetch('/brand-dashboard-invite', {
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


  //Write me a function which to search through the mongodb database based on the keyword input given in from the front end along with certain filters set buu the user take the input and the filter parameters as arguments to the seach function and write an effiecient mongodb query that serves the best recomondations and return it to the user front end. Please code this keeping in mind that we are working in MERN. Lets think step by step

  let n1 = 8
  let n2 = 6
  // Main menu vertical bar
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openCollabForm, setOpenCollabForm] = useState(false);
  const [scrollCollabForm, setScrollCollabForm] = useState('paper');

  const handleClickOpenCollabForm = (scrollType) => () => {
    setOpenCollabForm(true);
    setScrollCollabForm(scrollType);
  };

  const handleCloseCollabForm = () => {
    setOpenCollabForm(false);
  };

  const [validated, setValidated] = useState(false);

  const handleSubmitCollab = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
              IB Collab - Brand
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
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("Home")}  >
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

              <ListItemText primary="Search Influencers" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("Invitations")}>
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

          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("Queries")} >
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

              <ListItemText primary="Raise Query" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenu("CreateCollab")} >
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
                <img src={createCollab} width={25} />
              </ListItemIcon>

              <ListItemText primary="Create Collab" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {menu === 'Home' && <>

          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={4}>
              <AdminCards number={totalRegisteredInfluencers} title={"Total Influencers Registered"} color={'#ff5722'} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AdminCards number={8} title={"Total Invitations Recieved"} color={'#999999'} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AdminCards number={3} title={"Total Collabs Successful"} color={'#999999'} />
            </Grid>
          </Grid>

        </>}

        {menu === 'Search Influencers' && <>

          <Box sx={{ flexGrow: 1 }}>
            <div className='search'>
              <div className='search-bar'>
                <Search >
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


            </div>
            <p></p>
            <p></p>
            <p className="text-muted mb-1">Recommended for you</p>
            <p></p>
            <div>
              <div className='Results'>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
                  {searchResults.map((influencer, index) => (
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


                          <p className="text-muted mb-1">{influencer.fname + " " + influencer.lname}</p>
                          <p className="text-muted mb-4">{influencer.city + ", " + influencer.state}</p>
                          <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                            <MDBCardText className="font-italic mb-1">Engement Rate: {influencer.engagementRate}</MDBCardText>
                            <MDBCardText className="font-italic mb-1">Followers: {influencer.followers}</MDBCardText>

                          </div>
                          <p></p>
                          <div className="d-flex justify-content-center mb-2">
                            <div className="d-flex justify-content-center mb-2">
                              {influencer.invited ? (
                                <MDBBtn disabled>Invited</MDBBtn>
                              ) : (
                                <MDBBtn onClick={() => handleInvite(index, influencer.email, influencer.engagementRate, influencer.followers, influencer.city, influencer.state, influencer.fname, influencer.lname)}>Invite</MDBBtn>
                              )}
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </Grid>
                  ))}
                </Grid>

              </div>
              <div className='Filters'>
                <FormGroup>

                  <FormControlLabel control={<Switch checked={isEngagementRateSelected} onChange={handleEngagementRateSwitchChange} />} label="Engagement Rate" />
                  <FormControlLabel control={<Switch checked={isFollowersSelected} onChange={handleFollowersSwitchChange} />} label="Followers" />
                  <p></p>
                  <TextField label="Filter by City" name='city' value={filters.city} id="outlined-size-small" size="small" onChange={handlechange} />
                  <p></p>
                  <TextField label="Filter by State" name='state' value={filters.state} id="outlined-size-small" size="small" onChange={handlechange} />
                  <p></p>

                  {categories.map((category, index) => (
                    <Accordion key={index}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                        <Typography>{category.category}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {category.subCategory.map((subCategory, index) => (
                          <Grid key={index} item xs={6}>
                            <FormControlLabel control={<Checkbox onChange={handleCategoryCheck} name={subCategory} />} label={subCategory} key={index} />
                          </Grid>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}

                </FormGroup>
              </div>
            </div>
          </Box>
        </>}
        {menu === "Invitations" && <>
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
                            Sent to: {" " + invitation.to[6] + " " + invitation.to[7]}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Followers: {" " + invitation.to[3]}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            EngagementRate: {" " + invitation.to[2]}
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
                            Sent to: {" " + invitation.to[6] + " " + invitation.to[7]}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Followers: {" " + invitation.to[3]}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            EngagementRate: {" " + invitation.to[2]}
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

        {menu === 'Queries' && <>
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
              <Form.Control as="textarea" rows={10} name="query" onChange={handleQuerychange} value={brandQuery.query} />
            </Form.Group>
            <Button variant="contained" size="large" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </>}

        {menu === 'CreateCollab' && <>

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
          <div>
            <Dialog open={openCollabForm} onClose={handleCloseCollabForm} scroll={scrollCollabForm} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
              <DialogTitle id="scroll-dialog-title">Create Collab</DialogTitle>
              <DialogContent dividers={scrollCollabForm === 'paper'}>
                <Form noValidate validated={validated} onSubmit={handleSubmitCollab}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Company name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Company name"
                      />
                      <Form.Control.Feedback type='invalid'>Enter Your Company Name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>Type of Request</Form.Label>
                      <Form.Select
                        name="categoryOfProduct"
                        required
                        className='drop-down'
                      >
                        <option value={null} >Choose</option>
                        <option value='Post'>Post</option>
                        <option value='Story'>Story</option>
                        <option value='Reel'>Reel</option>
                        <option value='Reel'>IG TV</option>
                      </Form.Select>
                      <Form.Control.Feedback>Choose A Request Type</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                      <Form.Label>Sum offered</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          placeholder="Amount"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter Amount.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label>Date of Request Completion</Form.Label>
                      <Form.Control type="date" placeholder="Date" required />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Date.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom05">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control type="text" placeholder="Product Name" required />
                      <Form.Control.Feedback type="invalid">
                        Please provide a Product Name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                      <Form.Label>Category of Product</Form.Label>
                      <Form.Select
                        name="categoryOfProduct"
                        required
                        className='drop-down'
                      >
                        <option value={null} >Choose Category</option>
                        <option value='Tech'>Technology</option>
                        <option value='Lifestyle'>Lifestyle</option>
                        <option value='Automobiles'>Automobiles</option>
                        <option value='Animals & Pets'>Animals & Pets</option>
                        <option value='Family & Kids'>Family & Kids</option>
                        <option value='Fashion'>Fashion</option>
                        <option value='Other'>Other</option>
                        <option value='Home'>Home & Decor</option>
                        <option value='Art'>Art/Performance/Movies&Music</option>
                        <option value='Travel'>Travel</option>
                        <option value='Food and Dining'>Food and Dining</option>
                        <option value='Business'>Business</option>
                        <option value='Events'>Events</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Category.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <p></p>
                    <p></p>
                    <Form.Group as={Col} className="mb-6">
                      <Form.Check
                        required
                        label=" Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                      />
                    </Form.Group>
                  </Row>

                </Form>


              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCollabForm}>Cancel</Button>
                <Button onClick={handleSubmitCollab}>Send Collab</Button>
              </DialogActions>
            </Dialog>
          </div>
          <Fab sx={
            {
              position: 'absolute',
              bottom: 16,
              right: 16
            }} aria-label='Add' color='primary' onClick={handleClickOpenCollabForm('paper')}>
            <AddIcon />
          </Fab>


        </>}


      </Box>


    </Box >
  );
}

