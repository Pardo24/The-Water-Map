import ButtonBases from "../components/buttons"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link} from 'react-router-dom'

function HomePage(){


    return(
        <>
       
        
        
        <div className="backgroundimg">
        <text></text><div className="footergran"><a href="https://github.com/Pardo24" target="_blank" rel="noreferrer"><GitHubIcon  style={{padding:"15px 10px 0 15px"}}/></a> <a href="https://www.linkedin.com/in/daniel-pardo-celaya-53a999242/"target="_blank" rel="noreferrer"><LinkedInIcon style={{padding:"15px 30px 0 15px"}}/></a>
        </div>
            <h1 className="titol"><text className="textsubrallat">Barna<text style={{color: "red"}}>[nav]</text></text></h1>
            <p className="parag"><text className="textsubrallat">Punts d'interes al mapa de barcelona</text></p>
            <ButtonBases/>
        </div>
        
        </>
    )
}

export default HomePage