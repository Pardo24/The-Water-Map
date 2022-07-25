import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
 
const API_URL = "http://localhost:5005/api";
 
 
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();
  
  /*  UPDATE - get authenticateUser from the context */
  const { storeToken, authenticateUser } = useContext(AuthContext);
 
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
 
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken );
      
				// Save the token in the localStorage.      
        storeToken(response.data.authToken);
				
        // Verify the token by sending a request 
        // to the server's JWT validation endpoint. 
        authenticateUser();                     // <== ADD
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (
    <div className="LoginPage">
      <h1>Login</h1>
 
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
 
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
 
        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  )
}
 
export default LoginPage;