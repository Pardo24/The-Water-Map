import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link, useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { useContext } from "react";                      
import { AuthContext } from "../context/auth.context";
import portada from '../pictures/portada.png'
import MenuComp from '../components/menu';


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
    inputOptions: {
        "New York": 'New York',
        "Barcelona": 'Barcelona',
        'London': 'London'

    },
    showCancelButton: true,
    confirmButtonColor: "#1F4690",
    inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === 'Barcelona') {
            resolve() 
            navigate('/map')
          } else {
            resolve('We are implementing this city, try Barcelona')
          }
        })},
    color: "#1F4690",
    background: '#EDEDED',
    backdrop: `
      ligthblue
    `
  ,
    }) }

    return(
        <>
       
        
        <div className="backgroundimg">
        
        <div className='primaryNav'><text></text><div className="footergran left"><a href="https://github.com/Pardo24" target="_blank" rel="noreferrer"><GitHubIcon  style={{padding:"15px 10px 0 15px", color:'white'}}/></a> <a href="https://www.linkedin.com/in/daniel-pardo-celaya-53a999242/" target="_blank" rel="noreferrer"><LinkedInIcon style={{padding:"15px 30px 0 15px", color:'white'}}/></a>
       </div> <MenuComp props='dark' fontSize='large' style={{marginRight:'20px'}}/></div>
            <h1 className="titol"><img src={portada} alt='portada'/></h1>
            <p className="parag"><text style={{fontWeight: 500}} className="textsubrallat">Flow everywhere</text></p>
            <Button onClick={()=>NeedWater()} style={{marginBottom:"292px", backgroundColor:'white', fontWeight:'700', color:'black', borderRadius:'50px'}}>Need some Water?</Button>
        </div>
        
        </>
    )
}

export default HomePage