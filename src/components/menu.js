import PopupState from "material-ui-popup-state"
import React from "react"
import { Button } from "@mui/material"
import { bindMenu, bindTrigger } from "material-ui-popup-state"
import { MenuItem } from '@mui/material'
import {Menu} from "@mui/material"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';

function MenuComp(props){
    const { 
        isLoggedIn,
        user,                  
        logOutUser             
      } = useContext(AuthContext);
      
return(
    <>
<PopupState variant="popover" popupId="demo-popup-menu">
  {(popupState) => (
    <>
    {props.props==='dark'&&
    <Button style={{borderRadius:'365px', color:'white'}} {...bindTrigger(popupState)}>
    <MenuIcon/>
      </Button>}
    {!props.props&&
      <Button style={{borderRadius:'365px', color:'black'}} {...bindTrigger(popupState)}>
       <MenuIcon/>
      </Button>}
      <Menu {...bindMenu(popupState)}>
      <MenuItem onClick={popupState.close}><Button><Link style={{color:'#1F4690', textDecoration:'none'}} to='/map'>Map</Link></Button></MenuItem>
      <MenuItem onClick={popupState.close}><Button><Link style={{color:'#1F4690', textDecoration:'none'}} to='/about'>About</Link></Button></MenuItem>
      {!isLoggedIn&&<>
        <MenuItem onClick={popupState.close}><Button><Link style={{color:'#1F4690', textDecoration:'none'}} to="/login">Login</Link></Button></MenuItem>
        <MenuItem onClick={popupState.close}><Button><Link style={{color:'#1F4690', textDecoration:'none'}} to='/signup'>Sign Up</Link></Button></MenuItem>
    </>}

         {isLoggedIn && (
        <MenuItem onClick={popupState.close}><Button style={{color:'#1F4690'}} onClick={()=>logOutUser()}>Logout</Button></MenuItem>)}
      </Menu>
      </>
  )}
</PopupState>
</>
)
}

export default MenuComp



   
       
            
          