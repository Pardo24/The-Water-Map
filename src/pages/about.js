import MenuComp from "../components/menu"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import about from '../pictures/about.jpg'

function About(){



    return(<>
        <div className='primaryNav'><text></text><div className="footergran left"><a href="https://github.com/Pardo24" target="_blank" rel="noreferrer"><GitHubIcon  style={{padding:"15px 10px 0 15px", color:'black'}}/></a> <a href="https://www.linkedin.com/in/daniel-pardo-celaya-53a999242/" target="_blank" rel="noreferrer"><LinkedInIcon style={{padding:"15px 30px 0 15px", color:'black'}}/></a>
        </div> <MenuComp  size='large' style={{marginRight:'20px'}}/></div>
    <div className="about"style={{marginTop:'5%',padding:'10px 0'}}>
        <img src={about} alt='water' width={500} height={400}/>
    <div className="aboutContent" style={{lineHeight:'25px'}}>
        <h1 style={{textAlign:'left!important'}}>Why?</h1>
        <br/>
        <p><b>The Water Map és una eina de salut pública al servei del ciutadà</b><br/>
        S’ajunta en un sol mapa serveis moltes vegades desconeguts: fonts d’aigua potable, WC públics i piscines. <br/>
        Amb aquesta app construim un pont de comunicació bidireccional entre la institució i la ciutadania. <br/>
        Es posa en valor el coneixement dels serveis que ofereix la ciutat per millorar la vida del seus habitants. <br/>
        Disfrutem al màxim de la nostra ciutat!<br/><br/> 
</p>

<p><b>The Water Map is a public health tool at the service of the citizen</b><br/>
        It brings together on a single map services often unknown: drinking water sources, public toilets and swimming pools. <br/>
        With this app we build a two-way communication bridge between the institution and the citizens.<br/>
        It enhances the knowledge of the services offered by the city to improve the lives of its inhabitants.<br/>
        Let's enjoy our city to the fullest!</p>

       </div> </div></>
    )
}


export default About