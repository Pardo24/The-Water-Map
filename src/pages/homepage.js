import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link, useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { useContext } from "react";                      
import { AuthContext } from "../context/auth.context";

function HomePage(){
    const { 
        isLoggedIn,
        user,                   // <== UPDATE
        logOutUser              // <== UPDATE
      } = useContext(AuthContext);

const navigate = useNavigate()
    
function NeedWater(){
 const MySwal = withReactContent(Swal)

 const {value: city} =  MySwal.fire({
    title: 'Choose your city',
    width: 500,
    padding: '3em',
    input: 'select',
    inputPlaceholder: 'Select a city',
    inputOptions: {
        "New York": 'New York',
        "Barcelona": 'Barcelona',
        'London': 'London'

    },
    showCancelButton: true,
    inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === 'Barcelona') {
            resolve() 
            navigate('/map')
          } else {
            resolve('We are implementing this city, try Barcelona')
          }
        })},
    color: 'darkblue',
    background: 'ligthblue grey',
    backdrop: `
      ligthblue
    `
  ,
    }) }

    return(
        <>
       
        
        <div className="backgroundimg">
        
        <text></text><div className="footergran"><a href="https://github.com/Pardo24" target="_blank" rel="noreferrer"><GitHubIcon  style={{padding:"15px 10px 0 15px"}}/></a> <a href="https://www.linkedin.com/in/daniel-pardo-celaya-53a999242/"target="_blank" rel="noreferrer"><LinkedInIcon style={{padding:"15px 30px 0 15px"}}/></a>
        {isLoggedIn && (
            <><button style={{alignSelf:'flex-end',marginLeft: '85%', fontWeight:'600'}} onClick={()=>logOutUser()}>LogOut</button></>
        )}
        {!isLoggedIn && (
            <>
            <Link to="/login" style={{alignSelf:'flex-end',marginLeft: '80%', fontWeight:'600'}}><Button >Login</Button></Link><Link to='/signup' style={{alignSelf:'flex-end',  marginLeft: '10px',fontWeight:'600'}}><Button >Sign Up</Button></Link>
            </>
            )}
        </div>
            <h1 className="titol"><text  style={{color: "darkblue"}} className="textsubrallat">Water<text style={{color: "black"}}>[map]</text></text></h1>
            <p className="parag"><text style={{fontWeight: 500}} className="textsubrallat">Water checkpoints across the world</text></p>
            <Button onClick={()=>NeedWater()} style={{marginBottom:"195px", backgroundColor:'white', fontWeight:'700'}} variant="outlined">Need some Water?</Button>
        </div>
        
        </>
    )
}

export default HomePage