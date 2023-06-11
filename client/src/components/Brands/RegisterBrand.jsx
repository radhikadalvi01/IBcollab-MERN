import React, { useState, useEffect } from 'react'
import brandimg from './Assets/4.png'
import Modal from '../Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Categories from './Categories'
import FileBase64 from 'react-file-base64'

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

const RegisterBrand = () => {


  const [btnState, setState] = useState();
  const [btnState2, setState2] = useState();

  const [modalState, setModalState] = useState(false);
  const modalClose = () => {
    setModalState(false);
  };

  const [brand, setBrand] = useState({
    fname: "",
    lname: "",
    company: "",
    Designation: "",
    companyEmail: "",
    contactNo: "",
    password: "",
    accepted: 0
  });

  const [brandDetails, setbrandDetails] = useState({
    companyEmail: "",
    companyWebsite: "",
    companySize: "",
    companyType: "",
    industry: "",
    state: "",
    city: "",
    brandLogo: ""

  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setbrandDetails({ ...brandDetails, brandLogo: base64 })
  }

  console.log(brandDetails)


  brandDetails.companyEmail = brand.companyEmail;
  const [brandCategories, setBrandCategories] = useState({
    companyEmail: brand.companyEmail
  })

  const getCategories = (categories) => {

    setBrandCategories({ ...brandCategories, category: categories })
  }

  const [cpassword, setcpassword] = useState("");
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [DesignationError, setDesignationError] = useState('');
  const [companyEmailError, setCompanyEmailError] = useState('');
  const [contactNoError, setContactNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedError, setisCheckedError] = useState("")
  const [companyWebsiteError, setCompanyWebsiteError] = useState('');
  const [companySizeError, setCompanySizeError] = useState('');
  const [companyTypeError, setCompanyTypeError] = useState('');
  const [industryError, setIndustryError] = useState('');
  const [fileError, setFileError] = useState('');
  const [stateError, setstateError] = useState('');
  const [cityError, setcityError] = useState('');
  const [dp, setDp] = useState(true);
  const [dp2, setDp2] = useState(false);
  const [dp3, setDp3] = useState(false);

  let name, value;
  const handlechange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setBrand({ ...brand, [name]: value });
  }

  const handlechange2 = (e) => {
    name = e.target.name;
    value = e.target.value;

    setbrandDetails({ ...brandDetails, [name]: value });
  }
  const submit = async (e) => {

    e.preventDefault();
    let isError = false;

    if (!brand.fname) {
      setFnameError('Required');
      isError = true;
    } else if (!/^[A-Za-z]+$/i.test(brand.fname)) {
      setFnameError('Invalid');
      isError = true;
    }
    else {
      setFnameError('');
    }

    if (!brand.lname) {
      setLnameError('Required');
      isError = true;
    } else if (!/^[A-Za-z]+$/i.test(brand.lname)) {
      setLnameError('Invalid');
      isError = true;
    }
    else {
      setLnameError('');
    }

    if (!brand.company) {
      setCompanyError('Required');
      isError = true;
    } else if (!/^[A-Za-z ]+$/i.test(brand.company)) {
      setCompanyError('Invalid');
      isError = true;
    }
    else {
      setCompanyError('');
    }

    if (!brand.Designation) {
      setDesignationError('Required');
      isError = true;
    } else if (!/^[A-Za-z ]+$/i.test(brand.Designation)) {
      setDesignationError('Invalid');
      isError = true;
    }
    else {
      setDesignationError('');
    }


    if (!brand.companyEmail) {
      setCompanyEmailError('Required');
      isError = true;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i.test(brand.companyEmail)) {
      setCompanyEmailError('Invalid');
      isError = true;
    }
    else {
      setCompanyEmailError('');
    }


    if (!brand.contactNo) {
      setContactNoError('Required');
      isError = true;
    } else if (!/^[0-9\-\+]{9,15}$/i.test(brand.contactNo)) {
      setContactNoError('Invalid');
      isError = true;
    }
    else {
      setContactNoError('');
    }

    if (!brand.password) {
      setPasswordError('Required');
      isError = true;
    } else if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^]).{8,32}$/i.test(brand.password)) {
      setPasswordError('Invalid');
      isError = true;
    }
    else {
      setPasswordError('');
    }

    if (!cpassword) {
      setConfirmPasswordError('Required');
      isError = true;
    } else if (brand.password !== cpassword) {
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
      const { fname, lname, company, Designation, companyEmail, contactNo, password, accepted } = brand;
      const response = await fetch('/brand-registration', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname, lname, company, Designation, companyEmail, contactNo, password, accepted
        })

      });
      const data = await response.json();
      if (response.status === 422 || !data) {
        setModalState(true)
      } else if (response.status === 201) {
        window.alert("Registration Successful")
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


  const submit2 = async (e) => {
    e.preventDefault();
    let isError = false;
    //    if (!brandDetails.companyWebsite) {
    //      setCompanyWebsiteError('Required');
    //      isError = true;
    //    }
    //    else if (!/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/i.test(brandDetails.companyEmail)) {
    //      setCompanyWebsiteError('Invalid');
    //      isError = true;
    //    }
    //    else {
    //      setCompanyWebsiteError('');
    //    }

    
    const fileSizeInBytes = brandDetails.brandLogo.length;

    const MAX_FILE_SIZE = 1024 * 1024; // 1 MB
    if (fileSizeInBytes === 0){
      setFileError("Required")
    }
    else if (fileSizeInBytes > MAX_FILE_SIZE) {
      isError= true;
      setFileError("File should be Less than 1MB")
    } else {
      setFileError("")
    }

    if (!brandDetails.companySize) {
      setCompanySizeError('Required');
      isError = true;
    }
    else {
      setCompanySizeError('');
    }

    if (!brandDetails.companyType) {
      setCompanyTypeError('Required');
      isError = true;
    }
    else {
      setCompanyTypeError('');
    }

    if (!brandDetails.industry) {
      setIndustryError('Required');
      isError = true;
    }
    else {
      setIndustryError('');
    }

    if (!brandDetails.state) {
      setstateError('Required');
      isError = true;
    }
    else if (!/^[A-Za-z ]+$/i.test(brandDetails.state)) {
      setstateError("Invalid")
      isError = true;
    } else {
      setstateError('');
    }

    if (!brandDetails.city) {
      setcityError('Required');
      isError = true;
    }
    else if (!/^[A-Za-z ]+$/i.test(brandDetails.city)) {
      setcityError("Invalid")
      isError = true;
    } else {
      setcityError('');
    }

    if (!isError) {
      const { companyEmail, companyWebsite, companySize, companyType, industry, state, city, brandLogo } = brandDetails;
      const response = await fetch('/brand-registration', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          companyEmail, companyWebsite, companySize, companyType, industry, state, city, brandLogo
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



  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('/brand-registration').then((categories) => {
      categories.json().then((response) => {
        setCategories(response)
      })
    });
  }, [])




  return (
    <div className='RegisterBrand'>
      <div className='Box'>
        {dp && <>
          <h3>Register as a Brand</h3>
          <div className='form-box'>
            <Modal errorTitle={"Email Already Exists"} errorMessage={"Please Try Logging in or Use another Email ID."} open={modalState} onClose={modalClose} />
            <Form method='POST'>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>First Name{fnameError && <p className='displayError'>{fnameError}</p>}</Form.Label>
                  <Form.Control type="text" name="fname" value={brand.fname} onChange={handlechange} placeholder="Enter First Name" />

                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Last Name{lnameError && <p className='displayError'>{lnameError}</p>}</Form.Label>
                  <Form.Control type="text" name="lname" value={brand.lname} onChange={handlechange} placeholder="Enter Last Name" />

                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Company{companyError && <p className='displayError'>{companyError}</p>}</Form.Label>
                  <Form.Control type="text" name="company" value={brand.company} onChange={handlechange} placeholder='Company' />

                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Designation{DesignationError && <p className='displayError'>{DesignationError}</p>}</Form.Label>
                  <Form.Control type="text" name="Designation" value={brand.Designation} onChange={handlechange} placeholder="Designation" />

                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Company Email ID{companyEmailError && <p className='displayError'>{companyEmailError}</p>}</Form.Label>
                  <Form.Control type='text' name='companyEmail' value={brand.companyEmail} onChange={handlechange} placeholder="Enter email" />

                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Contact Number{contactNoError && <p className='displayError'>{contactNoError}</p>}</Form.Label>
                  <Form.Control type="text" name="contactNo" value={brand.contactNo} onChange={handlechange} placeholder="Your Contact Number" />

                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Password{passwordError && <p className='displayError'>{passwordError}</p>}</Form.Label>
                  <Form.Control type="password" name="password" value={brand.password} onChange={handlechange} placeholder="Password" />

                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Confirm Password{confirmPasswordError && <p className='displayError'>{confirmPasswordError}</p>}</Form.Label>
                  <Form.Control type="password" name="cpassword" value={cpassword} onChange={e => setcpassword(e.target.value)} placeholder="Confirm Password" />

                </Form.Group>
              </Row>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label=" &nbsp; I agree to all the T&C of IB Collab" checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} />
                {isCheckedError && <p className='displayError'>{isCheckedError}</p>}
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Button className="form-btn" onClick={submit}>
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
              <img src={brandimg} alt="img not available" height={450} />
            </div>
          </div></>}

        {dp2 && <>

          <h3>Enter Brand Details</h3>


          <div className='form-box'>
            <Modal errorTitle={"Details Not Saved"} errorMessage={"Some Error has Occured try Registering again."} open={modalState} onClose={modalClose} />
            <Form method='POST'>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Company Website{companyWebsiteError && <p className='displayError'>{companyWebsiteError}</p>}</Form.Label>
                  <Form.Control type="url" name='companyWebsite' value={brandDetails.companyWebsite} onChange={handlechange2} placeholder="Company Website" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Company Size{companySizeError && <p className='displayError'>{companySizeError}</p>}</Form.Label>
                  <Form.Select
                    value={brandDetails.companySize}
                    onChange={handlechange2}
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

                </Form.Group>

              </Row>
              <Row className="mb-3">

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Company Industry{industryError && <p className='displayError'>{industryError}</p>}</Form.Label>
                  <Form.Select
                    value={brandDetails.industry}
                    onChange={handlechange2}
                    name="industry"
                    required
                    className='drop-down'
                  >
                    <option value={null} >Choose Size</option>
                    <option value='Product'>Product</option>
                    <option value='Service'>Service</option>
                    <option value='Retail'>Retail</option>
                    <option value='Corporate'>Corporate</option>
                    <option value='Luxury'>Luxury</option>
                    <option value='Fashion'>Fashion</option>
                    <option value='Education'>Education</option>
                    <option value='Electronic'>Electronic</option>
                    <option value='NGO'>NGO</option>
                    <option value='Purpose Driven'>Purpose Driven</option>
                    <option value='Vegan'>Vegan</option>
                  </Form.Select>

                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Company Type{companyTypeError && <p className='displayError'>{companyTypeError}</p>}</Form.Label>
                  <Form.Select
                    value={brandDetails.companyType}
                    onChange={handlechange2}
                    name="companyType"
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

                </Form.Group>

              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State{stateError && <p className='displayError'>{stateError}</p>}</Form.Label>
                  <Form.Control name="state" value={brandDetails.state} onChange={handlechange2} placeholder="State" required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>City{cityError && <p className='displayError'>{cityError}</p>}</Form.Label>
                  <Form.Control name="city" value={brandDetails.city} onChange={handlechange2} placeholder="City" required />
                </Form.Group>
              </Row>

              <Row>
                <Form.Label>Upload Brand Logo{fileError && <p className='displayError'>{fileError}</p>}</Form.Label>
                <input
                  type="file"
                  lable="Image"
                  name="myFile"
                  id='file-upload'
                  accept='.jpeg, .png, .jpg'
                  onChange={(e) => handleFileUpload(e)}
                  required
                />
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
              <img src={brandimg} alt="img not available" height={450} />
            </div>
          </div></>
        }

        {dp3 && <>


          <Modal errorTitle={"Categories Not Saved"} errorMessage={"Categories are not saved Please Try Registrering again."} open={modalState} onClose={modalClose} />
          <div className='category-box'>
            <div className='Categories'>
              <h3>Enter Categories</h3>
              <Categories categories={categories} sendCategories={getCategories} />
            </div>
          </div>

        </>}





      </div>

    </div>
  )
}

export default RegisterBrand