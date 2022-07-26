import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Maps from './pages/maps';
import HomePage from './pages/homepage';
import { AuthProviderWrapper } from "./context/auth.context"
import Signup from './pages/signup';
import LoginPage from './pages/login';
import IsAnon from './pages/isAnon';
import { AttributionControl } from 'react-leaflet';
import About from './pages/about';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  <BrowserRouter>

  <AuthProviderWrapper>

  <Routes>
      <Route path='/map' element={<Maps/>}> </Route>
      <Route path='/lavafont/:lavafontId' element={<Maps/>}> </Route>
      <Route path='/' element={<HomePage/>}> </Route>
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<IsAnon><Signup/></IsAnon>}> </Route>
      <Route path='/login' element={<IsAnon><LoginPage/></IsAnon>}> </Route>
    </Routes>

    </AuthProviderWrapper>

   </BrowserRouter>
   
    <App />

 

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
