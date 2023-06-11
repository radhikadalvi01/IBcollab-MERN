import React, { useState, useEffect } from 'react'
import '../App.css'
import influencerimg from './Assets/5.png'
import Modal from '../Modal'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Categories from './Categories';


const RegisterInfluencer = () => {

  const [btnState, setState] = useState(true);
  const [btnState2, setState2] = useState(true);

  const [modalState, setModalState] = useState(false);
  const modalClose = () => {
    setModalState(false);
  };


  const [influencer, setInfluencer] = useState({
    fname: "",
    lname: "",
    DOB: "",
    age: "",
    instaURL: "",
    email: "",
    contactNo: "",
    password: "",
    accepted: 0
  });

  const [influencerDetails, setInfluencerDetails] = useState({
    email: "",
    instaID: "",
    followers: "",
    likes: "",
    views: "",
    engagementRate: "",
    state: "",
    city: "",
    category:[]
  });


  influencerDetails.email = influencer.email;

  const getCategories = async (categories) => {
    influencerDetails.category=categories
    const { email, instaID, followers, likes, views, engagementRate, state, city , category} = influencerDetails;
    const response = await fetch('/influencer-registration', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, instaID, followers, likes, views, engagementRate, state, city, category
      })

    });

    const data = await response.json();

    if (response.status === 422 || !data) {
      setModalState(true)

    } else if (!data) {
      window.alert("Please Enter Data")

    } else if (response.status === 201) {
      setState2(false)
    }
  }


  const [cpassword, setcpassword] = useState("");
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [InstaURLError, setInstaURLError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactNoError, setContactNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedError, setisCheckedError] = useState("")
  const [instaIDError, setinstaIDError] = useState('');
  const [followersError, setfollowersError] = useState('');
  const [likesError, setlikesError] = useState('');
  const [viewsError, setviewsError] = useState('');
  const [engagementRateError, setengagementRateError] = useState('');
  const [stateError, setstateError] = useState('');
  const [cityError, setcityError] = useState('');

  const [dp, setDp] = useState(true);
  const [dp2, setDp2] = useState(false);
  const [dp3, setDp3] = useState(false);

  let name, value;
  const handlechange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setInfluencer({ ...influencer, [name]: value });
  }

  const handlechange2 = (e) => {
    name = e.target.name;
    value = e.target.value;

    setInfluencerDetails({ ...influencerDetails, [name]: value });
  }

  const CalculateAge = (DOB) => {

    if (DOB) {
      const dob = new Date(DOB);
      const currentDate = new Date(Date.now());

      let age = currentDate.getFullYear() - dob.getFullYear();
      const monthDiff = currentDate.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
        age--;
      }
      return age
    }
  }
  //Handle Change Function for categories

  const submit = async (e) => {


    e.preventDefault();
    let isError = false;

    if (!influencer.fname) {
      setFnameError('Required');
      isError = true;
    } else if (!/^[A-Za-z]+$/i.test(influencer.fname)) {
      setFnameError('Invalid');
      isError = true;
    }
    else {
      setFnameError('');
    }

    if (!influencer.lname) {
      setLnameError('Required');
      isError = true;
    } else if (!/^[A-Za-z]+$/i.test(influencer.lname)) {
      setLnameError('Invalid');
      isError = true;
    }
    else {
      setLnameError('');
    }
    if (!influencer.DOB) {
      setDobError('Required');
      isError = true;
    } else if (CalculateAge(influencer.DOB) < 13) {
      setDobError('Invalid age')
    }
    else {
      influencer.age =CalculateAge(influencer.DOB)
      setDobError('');
    }

    //      if (!influencer.instaURL) {
    //        setInstaURLError('Required');
    //        isError = true;
    //      }
    //      else if (!/^(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)$/i.test(influencer.email)) {
    //        setInstaURLError('Invalid');
    //        isError = true;
    //      }
    //      else {
    //        setInstaURLError('');
    //      }

    if (!influencer.email) {
      setEmailError('Required');
      isError = true;
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(influencer.email)) {
      setEmailError('Invalid');
      isError = true;
    }
    else {
      setEmailError('');
    }

    if (!influencer.contactNo) {
      setContactNoError('Required');
      isError = true;
    }
    else if (!/^\d+$/.test(influencer.contactNo)) {
      setContactNoError('Invalid');
      isError = true;
    }
    else if (influencer.contactNo.length !== 10) {
      setContactNoError('Contact number must be 10 digits long');
      isError = true;
    }
    else {
      setContactNoError('');
    }

    if (!influencer.password) {
      setPasswordError('Required');
      isError = true;
    } else if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^]).{8,32}$/i.test(influencer.password)) {
      setPasswordError('Invalid');
      isError = true;
    } else {
      setPasswordError('');
    }

    if (!cpassword) {
      setConfirmPasswordError('Required');
      isError = true;
    } else if (influencer.password !== cpassword) {
      setConfirmPasswordError('Passwords do not match');
      isError = true;
    } else {
      setConfirmPasswordError('');
    }

    if (!isChecked) {
      setisCheckedError("Required")
      isError = true;
    }
    else {
      setisCheckedError("")
    }

    if (!isError) {
      const { fname, lname, DOB, age, instaURL, email, contactNo, password, accepted } = influencer;
      const response = await fetch('/influencer-registration', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname, lname, DOB, age, instaURL, email, contactNo, password, accepted
        })

      });
      const data = await response.json();
      if (response.status === 422 || !data) {
        setModalState(true)

      } else if (response.status === 201) {
        window.alert("Registered")
        setState(false)
      }
    }
  }

  function showNext() {
    setDp(!dp);
    setDp2(!dp2);
  }

  function showNext2() {
    setDp2(!dp2);
    setDp3(!dp3);
  }

  //form2
  const submit2 = async (e) => {

    e.preventDefault()


    let isError = false;

    if (!influencerDetails.instaID) {
      setinstaIDError('Required');

    }
    else if (!/^[a-zA-Z0-9._]+$/i.test(influencerDetails.instaID)) {
      setinstaIDError('Invalid');

    }
    else {
      setinstaIDError('');
    }

    if (!influencerDetails.likes) {
      setlikesError('Required');
      isError = true;
    }
    else if (!/^\d+$/.test(influencerDetails.likes)) {
      setlikesError('Invalid');
      isError = true;
    }
    else {
      setlikesError('');
    }
    if (!influencerDetails.views) {
      setviewsError('Required');
      isError = true;
    }
    else if (!/^\d+$/.test(influencerDetails.views)) {
      setviewsError('Invalid');
      isError = true;
    }
    else {
      setviewsError('');
    }
    if (!influencerDetails.followers) {
      setfollowersError('Required');
      isError = true;
    }
    else if (!/^\d+$/.test(influencerDetails.followers)) {
      setfollowersError('Invalid');
      isError = true;
    }
    else {
      setfollowersError('');
    }
    if (!influencerDetails.engagementRate) {
      setengagementRateError('Required');
      isError = true;
    }
    else if (!/^\d+$/.test(influencerDetails.engagementRate)) {

      setengagementRateError('Invalid');
      isError = true;
    } else if (influencerDetails.engagementRate > 100) {
      setengagementRateError('Invalid');
      isError = true;
    }
    else {
      setengagementRateError('');
    }


    if (!influencerDetails.state) {
      setstateError('Required');
      isError = true;
    } else if (!/^[A-Za-z]+$/i.test(influencerDetails.state)) {
      setstateError('Invalid');
      isError = true;
    }
    else {
      setstateError('');
    }
    if (!influencerDetails.city) {
      setcityError('Required');
      isError = true;
    } else if (!/^[A-Za-z]+$/i.test(influencerDetails.city)) {
      setcityError('Invalid');
      isError = true;
    }
    else {
      setcityError('');
    }

    if (!isError) {

      const { email, instaID, followers, likes, views, engagementRate, state, city } = influencerDetails;

      const response = await fetch('/influencer-registration', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, instaID, followers, likes, views, engagementRate, state, city
        })

      });

      const data = await response.json();

      if (response.status === 422 || !data) {
        setModalState(true)

      } else if (!data) {
        window.alert("Please Enter Data")

      } else if (response.status === 201) {
        setState2(false)
      }

    }

  }



  const [categories, setCategories] = useState()
  console.log("abc")
  console.log(categories)

  useEffect(() => {
    fetch('/influencer-registration').then((categories) => {
      categories.json().then((response) => {
        console.log(response)
        setCategories(response)
      })
    });
  }, [])


  return (
    <div className='RegisterInfluencer'>
      <div>


        {dp && <>

          <h3>Register as an Influencer</h3>


          <div className='form-box'>
            <Modal errorTitle={"Email Already Exists"} errorMessage={"Please Try Logging in or Use another Email ID."} open={modalState} onClose={modalClose} />
            <Form method='POST'>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>First Name{fnameError && <p className='displayError'>{fnameError}</p>}</Form.Label>
                  <Form.Control type="text" name="fname" value={influencer.fname} onChange={handlechange} pattern="[A-Za-z]+" title="First Name can only contain Alphabets" placeholder="Enter First Name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Last Name{lnameError && <p className='displayError'>{lnameError}</p>}</Form.Label>
                  <Form.Control type="text" name="lname" value={influencer.lname} onChange={handlechange} pattern="[A-Za-z]+" title="Last Name can only contain Alphabets" placeholder="Enter Last Name" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Date Of Birth{dobError && <p className='displayError'>{dobError}</p>}</Form.Label>
                  <Form.Control type="date" name="DOB" value={influencer.DOB} onChange={handlechange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Instagram Account URL{/*InstaURLError && <p className='displayError'>{InstaURLError}</p>*/}</Form.Label>
                  <Form.Control type="url" name="instaURL" value={influencer.instaURL} onChange={handlechange} placeholder="URL of Your Instagram Account" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email ID{emailError && <p className='displayError' >{emailError}</p>}</Form.Label>
                  <Form.Control type="email" name="email" value={influencer.email} onChange={handlechange} placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Contact Number{contactNoError && <p className='displayError'>{contactNoError}</p>}</Form.Label>
                  <Form.Control type="text" name="contactNo" value={influencer.contactNo} onChange={handlechange} placeholder="Contact Number" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Password{passwordError && <p className='displayError'>{passwordError}</p>}</Form.Label>
                  <Form.Control type="password" name="password" value={influencer.password} onChange={handlechange} placeholder="Password" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Confirm Password{confirmPasswordError && <p className='displayError'>{confirmPasswordError}</p>}</Form.Label>
                  <Form.Control type="password" name="confirmPassword" value={cpassword} onChange={e => setcpassword(e.target.value)} placeholder="Confirm Password" />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label=" &nbsp; I agree to all the T&C of IB Collab" checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} />
                {isCheckedError && <p className='displayError'>{isCheckedError}</p>}
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Button type='submit' className="form-btn" onClick={submit}>
                    Submit
                  </Button>
                </Form.Group>

                <Form.Group as={Col}>
                  <Button disabled={btnState} onClick={showNext} className="form-btn" >
                    Next
                  </Button>
                </Form.Group>
              </Row>

            </Form>
            <div className='form-img'>
              <img src={influencerimg} alt="img not available" height={450} />
            </div>
          </div>

        </>}

        {dp2 && <>

          <h3>Enter Your Details</h3>

          <Modal errorTitle={"Details Not Saved"} errorMessage={"Some Error has Occured try Registering again."} open={modalState} onClose={modalClose} />
          <div className='form-box'>

            <Form method='POST'>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Instagram ID{instaIDError && <p className='displayError' >{instaIDError}</p>}</Form.Label>
                  <Form.Control type="text" name='instaID' value={influencerDetails.instaID} onChange={handlechange2} placeholder="Insta ID" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Followers{followersError && <p className='displayError' >{followersError}</p>}</Form.Label>
                  <Form.Control type="text" name="followers" value={influencerDetails.followers} onChange={handlechange2} placeholder="Followers" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Views{viewsError && <p className='displayError' >{viewsError}</p>}</Form.Label>
                  <Form.Control type="text" name='views' value={influencerDetails.views} onChange={handlechange2} placeholder="Average Views Per Reel" />
                </Form.Group>

                <Form.Group as={Col} min='0' pattern="\d+" step='1' controlId="formGridPassword">
                  <Form.Label>Likes{likesError && <p className='displayError' >{likesError}</p>}</Form.Label>
                  <Form.Control type="text" name='likes' value={influencerDetails.likes} onChange={handlechange2} placeholder="Average Likes Per Post" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Engagement Rate{engagementRateError && <p className='displayError' >{engagementRateError}</p>}</Form.Label>
                  <Form.Control name="engagementRate" type="text" pattern="[0-9]+(\.[0-9]{1,2})?%?" title="This must be a number with up to 2 decimal places and/or %" value={influencerDetails.engagementRate} onChange={handlechange2} placeholder="Engagement Rate" />
                </Form.Group>
              </Row>

              <Row className="mb-3">

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State{stateError && <p className='displayError' >{stateError}</p>}</Form.Label>
                  <Form.Control name="state" value={influencerDetails.state} onChange={handlechange2} placeholder="State" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>City{cityError && <p className='displayError' >{cityError}</p>}</Form.Label>
                  <Form.Control name="city" value={influencerDetails.city} onChange={handlechange2} placeholder="City" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Button className="form-btn" onClick={submit2}>
                    Submit
                  </Button>
                </Form.Group>

                <Form.Group as={Col}>
                  <Button disabled={btnState2} onClick={showNext2} className="form-btn" >
                    Next
                  </Button>
                </Form.Group>
              </Row>

            </Form>
            <div className='form-img'>
              <img src={influencerimg} alt="img not available" height={450} />
            </div>
          </div>


        </>
        }

        {dp3 && <>

          <div className='Categories'>

            <Modal errorTitle={"Categories Not Saved"} errorMessage={"Categories are not saved Please Try Registrering again."} open={modalState} onClose={modalClose} />
            <h3>Enter Categories</h3>

            <div className='category-box'>
              <div className='categories'>
                <Categories categories={categories} sendCategories={getCategories} />
              </div>
            </div>
          </div>
        </>}
      </div>

    </div>




  )
}


export default RegisterInfluencer


