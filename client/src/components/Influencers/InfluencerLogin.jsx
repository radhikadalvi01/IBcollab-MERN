import React, {useState, useEffect} from 'react'
import '../App.css'
import { Link, useHistory} from 'react-router-dom'
import influencerLogin from './Assets/2.png'
import Modal from '../Modal'


const InfluencerLogin = () => {


  const history = useHistory();
  const [modalState , setModalState] = useState(false);
  const modalClose = () => {
    setModalState(false);
  };

  const [influencer, setInfluencer] = useState({
    email:"",
    password:""
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  let name, value;
  const handlechange = (e) => {

    name=e.target.name;
    value=e.target.value;
    setInfluencer({...influencer, [name]:value});

  }

  const submit = async (e) => {

    e.preventDefault();

    let isError = false;

    if (!influencer.email) {
      setEmailError('Company Email is required');
      isError = true;
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(influencer.email)) {
        setEmailError('Invalid email address');
        isError = true;
    } 
    else {
        setEmailError('');
    }

    if (!influencer.password) {
      setPasswordError('Password is required');
      isError = true;
    } else if (influencer.password.length < 8) {
        setPasswordError('Password must be at least 8 characters');
        isError = true;
    } else {
        setPasswordError('');
    }

    const { email, password} = influencer;

    if(!isError){

    if(!email|| !password){
      window.alert("Enter Data")
    }else{
      const response = await fetch('/influencer-login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      
      });
  
      const data = await response.json();
      if(response.status === 400 || !data){
        setModalState(true)
      }else if(response.status === 201){
        window.alert("Login Successful");
        history.push('/influencer-dashboard');
        
      }else{
        window.alert("Some Error has occured Please Try again!")
        history.push('/influencer-login');

      }
    }
  }
  }

  return (
    <>
    <Modal errorTitle = {"Invalid Credentials"} errorMessage = {"Please Enter Correct ID or Password"} open={modalState} onClose={modalClose} />
    <div className='InfluencerLogin'>
      <h3>Login as an INFLUENCER</h3>
      <img src={influencerLogin} alt='' height='50px' / ><br /><br/>
        <form method='POST' className="form">
        <input name='email'  type="text" value={influencer.email} onChange={handlechange} placeholder="Username" />
        {emailError && <p className='displayError' >{emailError}</p>}

        <input name='password'  type="password" value={influencer.password} onChange={handlechange} placeholder="Password" />
        {passwordError && <p className='displayError'>{passwordError}</p>}

        <button type="submit" value='Login' onClick={submit}>LOGIN</button>
      </form>
      <Link to='/influencer-registration' style={{ textDecoration: 'none' }}><h4>Not a user? Click here to REGISTER!</h4></Link>

    </div></>
  )
}

export default InfluencerLogin