import MenuComp from "../components/menu"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function About(){



    return(<>
        <div className='primaryNav'><text></text><div className="footergran left"><a href="https://github.com/Pardo24" target="_blank" rel="noreferrer"><GitHubIcon  style={{padding:"15px 10px 0 15px", color:'black'}}/></a> <a href="https://www.linkedin.com/in/daniel-pardo-celaya-53a999242/" target="_blank" rel="noreferrer"><LinkedInIcon style={{padding:"15px 30px 0 15px", color:'black'}}/></a>
        </div> <MenuComp  fontSize='large' style={{marginRight:'20px'}}/></div>
    <div className="about">
    <div className="aboutContent">
        <h1>About</h1>
        <h6>Why?</h6>
        <p>We live in a world where </p>
       </div> </div></>
    )
}


export default About