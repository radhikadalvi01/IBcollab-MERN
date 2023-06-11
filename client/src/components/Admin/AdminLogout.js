import React ,{useEffect} from 'react'
import { useHistory } from "react-router-dom"
const AdminLogout = () => {

  const history = useHistory();

  useEffect(()=>{
    fetch('/admin-logout', {
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
    }).then((res)=>{
      history.push('/admin-login', {replace:true})
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

export default AdminLogout