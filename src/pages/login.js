import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import SignIn from "../components/SingIn";
 import MenuComp from "../components/menu";
 import logomapa from '../pictures/logo-mapa.jpg'
 
 
function LoginPage(props) {
   
  
  return (
  <>
  <div className="primaryNav">
  <div className='footergran left' >
  <img src={logomapa} alt='logo' style={{margin:'10px 0 10px 0'}}/>
  </div>
    <MenuComp/>
  </div>
    
    <div>
    <SignIn />
    </div>
    </>

  )
}
 
export default LoginPage;