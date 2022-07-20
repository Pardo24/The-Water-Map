import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link, useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'


function HomePage(){

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
            resolve('We are implementing this city')
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
        </div>
            <h1 className="titol"><text  style={{color: "darkblue"}} className="textsubrallat">Water<text style={{color: "black"}}>[map]</text></text></h1>
            <p className="parag"><text style={{fontWeight: 500}} className="textsubrallat">Water checkpoints across the world</text></p>
            <Button onClick={()=>NeedWater()} style={{marginBottom:"195px", backgroundColor:'black', fontWeight:'700'}} variant="outlined">Need some Water?</Button>
        </div>
        
        </>
    )
}

export default HomePage