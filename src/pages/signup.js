
import MenuComp from "../components/menu";
import SignUp from "../components/SignUp";
import logomapa from '../pictures/logo-mapa.png'
import {Link} from 'react-router-dom'
 
 
function SignupPage(props) {

  
  return (
  <>
  <div className="primaryNav">
  <div className='footergran left' >
  <Link to='/'><img src={logomapa} alt='logo' style={{margin:'10px 0 10px 0'}}/></Link>
  </div>
    <MenuComp/>
  </div>
    <div className="SignupPage"><SignUp/>
      
    </div>
    </>
  )
}
 
export default SignupPage;