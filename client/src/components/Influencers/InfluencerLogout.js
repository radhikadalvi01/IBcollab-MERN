import React ,{useEffect} from 'react'
import { useHistory } from "react-router-dom"
const InfluencerLogout = () => {

  const history = useHistory();

  useEffect(()=>{
    fetch('/influencer-logout', {
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
    }).then((res)=>{
      history.push('/influencer-login', {replace:true})
      if(res.status !== 200){
        const error = new Error(res.error);
        throw error;
      }
    }).catch((err)=>{
      console.log(err)
    })

  },[])


  return (
    <div></div>
  )
}

export default InfluencerLogout