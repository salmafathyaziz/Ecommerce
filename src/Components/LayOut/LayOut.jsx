import React, { useContext, useEffect } from 'react'
import styles from'./LayOut.module.css'
import NavBar from "../NavBar/NavBar"

import { Outlet } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

import { Offline, Online } from "react-detect-offline";


export default function LayOut() {

  //mounting phase
 let {setUserToken} = useContext(UserContext)
 //hatshtghal awel ma elapp yeftah
  useEffect (() => {
 if(localStorage.getItem('userToken') !== null ) 
 {
   setUserToken(localStorage.getItem('userToken'))
 }
  }, []);

  return <>
  <NavBar/>
  <div className="container py-5">
  <Outlet></Outlet> </div>

  <div>
    
    <Offline><div className='network'> <i className='fas fa-wifi me-2'></i>You're offline </div></Offline>
  </div>


  
  </>
}
