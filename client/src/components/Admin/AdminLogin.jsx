import React, { useState } from 'react'
import '../App.css'
import { Link, useHistory } from 'react-router-dom'
import adminLogo from './Assets/3.png'


const AdminLogin = () => {

  //UseState Declarations

  const history = useHistory();

  const [admin, setAdmin] = useState({ companyEmail: "", password: "" });
  const [companyEmailError, setCompanyEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  //_________________________________________________________________//

  //Function

  //Handling & submiting Input
  let name, value;
  const handlechange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setAdmin({ ...admin, [name]: value });
  }

  const submit = async (e) => {
    e.preventDefault();
    let isError = false;
    const { companyEmail, password } = admin;

    //Validations

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

    if (!admin.password) {
      setPasswordError('Password is required');
      isError = true;
    } else if (admin.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isError = true;
    } else {
      setPasswordError('');
    }

    if (!isError) {

      if (!companyEmail || !password) {
        window.alert("Enter Data")
      } else {
        const response = await fetch('/admin-login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            companyEmail, password
          })

        });

        const data = await response.json();
        if (response.status === 400 || !data) {
          window.alert("Login failed");
        } else if (response.status === 201) {
          window.alert("Login Successful!!");
          history.push('/admin-dashboard');
        } else {
          window.alert("Some other error has occured")
        }
      }
    }




  }

  return (
    <div className='AdminLogin'>

      <h3>Login as an ADMIN</h3>
      <img src={adminLogo} alt='' height='50px' /><br /><br />
      <form method='POST' className="form">
        <input name='companyEmail' type="text" value={admin.companyEmail} onChange={handlechange} placeholder="Username" />
        {companyEmailError && <p className='displayError' >{companyEmailError}</p>}
        <input name='password' type="password" value={admin.password} onChange={handlechange} placeholder="Password" />
        {passwordError && <p className='displayError'>{passwordError}</p>}
        <Link to='/admin-dashboard'><button type="submit" value='Login' onClick={submit}>LOGIN</button></Link>
      </form>
      <Link to='/admin-registration' style={{ textDecoration: 'none' }}><h4>Not a user? Click here to REGISTER!</h4></Link>

    </div>
  )
}

export default AdminLogin