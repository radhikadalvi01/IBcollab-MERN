import React, {useState} from 'react'
import adminimg from './Assets/6.png'

const RegisterAdmin = () => {

  

  const [admin, setAdmin] = useState({
    fname:"",
    lname:"",
    Designation:"",
    companyEmail:"",
    contactNo:"",
    password:""
  });

  const [cpassword, setcpassword] = useState("");
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [designationError, setDesignationError] = useState('');
  const [companyEmailError, setCompanyEmailError] = useState('');
  const [contactNoError, setContactNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  let name, value;
  const handlechange = (e) => {
    console.log(e);
    name=e.target.name;
    value=e.target.value;

    setAdmin({...admin, [name]:value});
  }

  const submit = async (e) => {
    e.preventDefault();
    let isError = false;


    if (!admin.fname) {
      setFnameError('Fname is required');
      isError = true;
    }else if (!/^[A-Za-z]+$/i.test(admin.fname)) {
      setFnameError('Invalid Name- must contain only alphabets');
      isError = true;
    }  
    else {
      setFnameError('');
    }

    if (!admin.lname) {
      setLnameError('Lname is required');
      isError = true;
    }else if (!/^[A-Za-z]+$/i.test(admin.lname)) {
      setLnameError('Invalid Last Name - must contain only alphabets');
      isError = true;
    }  
    else {
      setLnameError('');
    }

    if (!admin.Designation) {
      setDesignationError('Designation is required');
      isError = true;
    }else if (!/^[A-Za-z]+$/i.test(admin.Designation)) {
      setDesignationError('Invalid Designation - must contain only alphabets ');
      isError = true;
    }  
    else {
      setDesignationError('');
    }

    if (!admin.companyEmail) {
        setCompanyEmailError('Company Email is required');
        isError = true;
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(admin.companyEmail)) {
        setCompanyEmailError('Invalid email address');
        isError = true;
    } 
    else {
        setCompanyEmailError('');
    }

    if (!admin.contactNo) {
      setContactNoError('Contact Number is required');
        isError = true;
    } 
    else if (!/^\d+$/.test(admin.contactNo)) {
      setContactNoError ('Contact Number can only contain digits');
      isError = true;
    } 
    else if (admin.contactNo.length !== 10) {
      setContactNoError ('Contact number must be 10 digits long');
      isError = true;
    }
    else {
      setContactNoError('');
    }

    if (!admin.password) {
        setPasswordError('Password is required');
        isError = true;
    } else if (admin.password.length < 8) {
        setPasswordError('Password must be at least 8 characters');
        isError = true;
    } else {
        setPasswordError('');
    }

    if (!cpassword) {
        setConfirmPasswordError('Confirm password is required');
        isError = true;
    } else if (admin.password !== cpassword) {
        setConfirmPasswordError('Passwords do not match');
        isError = true;
    } else {
        setConfirmPasswordError('');
    }

    if (!isError) {
    const {fname, lname, company, Designation, companyEmail,contactNo, password} = admin;
    const response = await fetch('/admin-registration', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname, lname, company, Designation, companyEmail,contactNo, password
      })
    
    });
    const data = await response.json();
    if(response.status === 422 || !data){
      window.alert("Invalid Registration");
      console.log("Invalid Registration")
    }else if(response.status === 201){
      window.alert("Registration Successful");
      console.log("Registration Successful")
    }
  }

  }

  return (
    <div className='RegisterAdmin'>
      <div className='Box'>
      <h3>Register as ADMIN</h3>
      <div className='form-content'>
      <form className="form" method = 'POST'>
        <input type="text" name="fname" id="fname" value={admin.fname} onChange={handlechange}  placeholder="First Name" />
        {fnameError && <p className='displayError'>{fnameError}</p>}

        <input type="text" name="lname" id="lname" value={admin.lname} onChange={handlechange}  placeholder="Last Name"  />
        {lnameError && <p className='displayError'>{lnameError}</p>}

        <input type="text" name="Designation" id="Designation" value={admin.Designation} onChange={handlechange}  placeholder="Your Designation"  />
        {designationError && <p className='displayError' >{designationError}</p>}

        <input type="text" name="companyEmail" id="companyEmail" value={admin.companyEmail} onChange={handlechange}  placeholder="Email Id" />
        {companyEmailError && <p className='displayError' >{companyEmailError}</p>}

        <input type="text" name="contactNo" id="contactNo" value={admin.contactNo} onChange={handlechange}  placeholder="Contact No"  />
        {contactNoError && <p className='displayError' >{contactNoError}</p>}

        <input type="password" name="password" value={admin.password} onChange={handlechange}  placeholder="Password" />
        {passwordError && <p className='displayError'>{passwordError}</p>}

        <input type="password" placeholder="Confirm Password" value={cpassword} onChange={e => setcpassword(e.target.value)}  />
        {confirmPasswordError && <p className='displayError'>{confirmPasswordError}</p>}

        <button type="submit" name='submit' id='submit' className="submit-btn" value='register' onClick={submit}>Submit</button>
        
      </form>
      </div>
      
        <div className='form-img'>
          <img src={adminimg} alt="img not available" height={400}/>
        </div>
        </div>
    </div>
  )
}

export default RegisterAdmin