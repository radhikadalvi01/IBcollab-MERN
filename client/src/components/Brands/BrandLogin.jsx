import React, {useState} from 'react'
import '../App.css'
import { Link, useHistory } from 'react-router-dom'
import brandLogin from './Assets/1.png'
import Modal from '../Modal'

const BrandLogin = () => {
 
  const history = useHistory();

  const [modalState , setModalState] = useState(false);
  const modalClose = () => {
    setModalState(false);
  };


  const [brand, setBrand] = useState({
    companyEmail:"",
    password:""
  });

  const [companyEmailError, setCompanyEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  let name, value;
  const handlechange = (e) => {

    name=e.target.name;
    value=e.target.value;
    setBrand({...brand, [name]:value});

  }

  const submit = async (e) => {

    e.preventDefault();
    let isError = false;

    if (!brand.companyEmail) {
      setCompanyEmailError('Company Email is required');
      isError = true;
  } 
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(brand.companyEmail)) {
      setCompanyEmailError('Invalid email address');
      isError = true;
  } 
  else {
      setCompanyEmailError('');
  }

  if (!brand.password) {
    setPasswordError('Password is required');
    isError = true;
} else if (brand.password.length < 8) {
    setPasswordError('Password must be at least 8 characters');
    isError = true;
} else {
    setPasswordError('');
}


    const { companyEmail, password} = brand;

    if(!isError){

      const response = await fetch('/brand-login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          companyEmail, password
        })
      
      });

      const data = await response.json();
      console.log(data)
      if(response.status === 400 ){
        setModalState(true)
      }else if (!data){

      }else if(response.status === 201){
        history.push('/brand-dashboard');      
      }else{
        window.alert("Some Error has occured Please Try again!")
        history.push('/brand-login');

      }
    }
  }




  return (

    <>

    <Modal errorTitle = {"Invalid Credentials"} errorMessage = {"Please Enter Correct ID or Password"} open={modalState} onClose={modalClose} />
    <div className='BrandLogin'>
      <h3>Login as a BRAND</h3>
      <img src={brandLogin} alt='' height='50px' / ><br /><br/>
        <form method='POST' className="form">
        <input name='companyEmail'  type="text" value={brand.companyEmail} onChange={handlechange} placeholder="Username" />
        {companyEmailError && <p className='displayError' >{companyEmailError}</p>}
        <input name='password'  type="password" value={brand.password} onChange={handlechange} placeholder="Password" />
        {passwordError && <p className='displayError'>{passwordError}</p>}
        <button type="submit" value='Login' onClick={submit}>LOGIN</button>
      </form>
      <Link to='/brand-registration' style={{ textDecoration: 'none' }}><h4>Not a user? Click here to REGISTER!</h4></Link>

    </div>

    </>
  )
}

export default BrandLogin