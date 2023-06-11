import React from 'react'
import brand from '../assets/1.png'
import influencer from '../assets/2.png'
import {

  Link,

} from 'react-router-dom';


const Login = () => {



  return (
    <div className='Login'>
        <h1>IB Collab</h1>
        <h3>Login as</h3>
        <br />
        <div className='logindivL'>
            <img src={brand} alt='' height='100px' / ><br /><br/>
            <Link to="/brand-login"><button>BRAND</button></Link>
        </div>
        <div className='logindivR'>

            <img src={influencer} alt='' height='100px' / ><br /><br/>
            <Link to="/influencer-login"><button>INFLUENCER</button></Link>
        </div>

        
         
    </div>
  )
}

export default Login