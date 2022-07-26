import MenuComp from "../components/menu"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import about from '../pictures/about.jpg'

function About(){



    return(<>
        <div className='primaryNav'><text></text><div className="footergran left"><a href="https://github.com/Pardo24" target="_blank" rel="noreferrer"><GitHubIcon  style={{padding:"15px 10px 0 15px", color:'black'}}/></a> <a href="https://www.linkedin.com/in/daniel-pardo-celaya-53a999242/" target="_blank" rel="noreferrer"><LinkedInIcon style={{padding:"15px 30px 0 15px", color:'black'}}/></a>
        </div> <MenuComp  size='large' style={{marginRight:'20px'}}/></div>
    <div className="about"style={{marginTop:'30px'}}>
        <img src={about} alt='water' width={600} height={500}/>
    <div className="aboutContent" style={{textAlign:'center'}}>
        <h1>Why?</h1>
        <br/>
        <p>We live in a world where a lot of water is wasted,<br/><br/> 

        the natural resources are running out, <br/><br/>
        and every year the weather is getting hotter. <br/><br/>
        <br/><br/>
        The aim of this project is to take advantage of the resources our cities bring <br/><br/>
        to reduce the waste of one of our most precious resource; <br/><br/><b style={{color:'#1F4690'}}>the Water</b></p>
       </div> </div></>
    )
}


export default About