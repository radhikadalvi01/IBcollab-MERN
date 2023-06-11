import React from 'react'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,

} from 'mdb-react-ui-kit';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import '../App.css'
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useState} from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InfluencerProfilePage = (props) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (id) => {
    fetch(`/influencer-profile-page/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedSubcategories, id }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.alert("Categories Updated Successfully")
        }
      })
      .catch((error) => {
        console.error(error);
      });

    handleClose();
  }

  const location = useLocation();
  const profileData = location.state.profileData
  const userData = profileData[0];
  const brandcategories = userData.category
  console.log(userData)
  console.log(userData)
  const allcategories = profileData[1];
  console.log(allcategories)


  const [selectedSubcategories, setSelectedSubcategories] = useState(brandcategories);

  const handleSubcategoryChange = (event, subcategory) => {
    if (event.target.checked) {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    } else {
      setSelectedSubcategories(selectedSubcategories.filter((s) => s !== subcategory));
    }
  };

  const rows = [];
  for (let i = 0; i < brandcategories.length; i += 2) {
    rows.push(
      <MDBRow key={i}>
        <MDBCol md="6">
          <MDBCardText className="mb-1" style={{ fontSize: '1rem' }}>{brandcategories[i]}</MDBCardText>
        </MDBCol>
        {i + 1 < brandcategories.length &&
          <MDBCol md="6">
            <MDBCardText className="mb-1" style={{ fontSize: '1rem' }}>{brandcategories[i + 1]}</MDBCardText>
          </MDBCol>
        }
      </MDBRow>
    );
  }

  let status = ""

  if (userData.accepted === 0) {
    status = "Pending"
  } else if (userData.accepted === 1) {
    status = "Approved"
  }

  return (
    <div>
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Edit Categories
              </Typography>
              <Button autoFocus color="inherit" onClick={() => handleSave(userData._id)}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className='ProfileEditCats'>
            {allcategories.map(({ category, subCategory }) => (
              <div className="ProfileEditCats" key={category}>
                <h5>{category}</h5>
                <div>
                  {subCategory.map((subcategory) => (
                    <FormControlLabel
                      key={subcategory}
                      control={
                        <Checkbox
                          checked={selectedSubcategories.includes(subcategory)}
                          onChange={(event) => handleSubcategoryChange(event, subcategory)}
                        />
                      }
                      label={subcategory}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Dialog>
      </div>

      <section style={{ backgroundColor: '#B4E4FF' }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid /><hr />
                  <MDBCardText>{userData.fname + " " + userData.lname}</MDBCardText>
                  <p className="text-muted mb-4">{userData.city + ", " + userData.state}</p>
                  <p className="text-muted mb-4">Status:{" " + status}</p>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Insta ID</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.instaID}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Insta URL</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.instaURL}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Followers</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.followers}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Likes</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.likes}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Views</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.views}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Engagement Rate</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.engagementRate}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.fname + " " + userData.lname}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>DOB</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.DOB}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Age</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.age}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Contact No</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.contactNo}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Location</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData.city + ", " + userData.state}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              <MDBRow>
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4" style={{ fontSize: '1.5rem' }}>Categories</MDBCardText>
                    {rows}
                  </MDBCardBody>
                </MDBCard>


              </MDBRow>

            </MDBCol>

          </MDBRow>

        </MDBContainer>
        <Fab sx={
          {
            position: 'absolute',
            top: 16,
            right: 16
          }} aria-label='Add' color='primary' onClick={handleClickOpen}>
          <EditIcon />
        </Fab>
      </section >
    </div >
  )
}

export default InfluencerProfilePage