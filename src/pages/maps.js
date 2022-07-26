import React, { useRef } from "react"
import {MapContainer, TileLayer, LayersControl} from 'react-leaflet'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import { Popup, Marker } from "react-leaflet"
import {useMapEvents} from 'react-leaflet'
import markerIcon from "../pictures/persona.png"
import { Icon} from 'leaflet'
import axios from "axios";
import wcIcon from '../pictures/wc-icon.png'
import fontIcon from '../pictures/font-icon.png'
import { Button } from "@mui/material"
import Formulari from "../components/formulari"
import { useContext } from "react";                      
import { AuthContext } from "../context/auth.context";
import iconoPiscina from '../pictures/iconoPiscina.png'
import logomapa from '../pictures/logo-mapa.jpg'
import MenuComp from "../components/menu"
import wcIconWhi from '../pictures/wc-icon-white.png'
import piscIconWhi from '../pictures/iconoPiscina-white.png'
import fontIconWhi from '../pictures/font-icon-white.png'



const API_URL = "http://localhost:5005/api";





function LocationMarker() {
  const [position, setPosition] = useState(null)
const map = useMapEvents({
  contextmenu() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 16)
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={new Icon({iconUrl: markerIcon, iconSize: [18, 41], iconAnchor: [18, 41]})}>
      <Popup>You are here</Popup>
    </Marker>
   
  )}



function Maps(){
const [lavabos, setLavabos] = useState([])
const [fonts, setFonts]= useState([])
const [piscines, setPiscines] = useState([])
const [showForm, setShowForm] = useState(false)
const [center, setCenter] = useState({ lat: 41.38201718772406,  lng: 2.140611050113362})
const [dataApi, setDataApi] = useState([])
const [showLab, setShowLab] = useState(true)
const [showFon, setShowFon] = useState(false)
const [showPis, setShowPis] = useState(false)
const ZOOM_LEVEL =14 
const mapRef = useRef()
const {BaseLayer} = LayersControl

const { 
  isLoggedIn,
  user,                  
  logOutUser             
} = useContext(AuthContext);




const getOneItem=(_id)=> {
    //const storedToken = localStorage.getItem('authToken');, { headers: { Authorization: `Bearer ${storedToken}` }}

    axios.get(`${API_URL}/lavafont/${_id}` )
        
    .then((response)=>{setDataApi(response)
             
                      console.log(dataApi)
                  
return(
                (dataApi&& 
                 
                dataApi.map((cadaComment)=>{
                  const {photo, title, updatedAt, content, user} = cadaComment;
                return(
                  <>
                    {/* <t>{cadaComment.user}</t> */}
                    
                    {photo!==0&&(
                       
                    photo.map((image)=>(<img src={image} alt='no img'/>)))}

                    <h6>{title}</h6>
                    <t>{updatedAt}</t>
                    <p>{content}</p>
                  </>
                    )
                  })))
                
          })
    .catch((err)=>console.log(err))
}


const getAllFonts = () =>{
      axios
          .get(`${API_URL}/fonts`)
          .then((fontsData)=>{setFonts(fontsData.data)})
  }

const getAllLavabos = () =>{
      axios
        .get(`${API_URL}/lavabos`)
        .then((lavabos)=>{setLavabos(lavabos.data)})
}

const getAllPiscines=() =>{
      axios
        .get(`${API_URL}/piscines`)
        .then((piscines)=>setPiscines(piscines.data))
}

useEffect(() => {
    getAllFonts();
    getAllLavabos();
    getAllPiscines()

}, [] );




                                              
                                               
return(
       <body>

          <div className="primaryNav">
        <div className='footergran left' >
        <Link to='/' style={{alignitems:'center',textAlign:"center", marginBottom:"20px", marginTop:"30px"}}>
        <img src={logomapa} alt='logo'/>
        </Link>
 </div>
        <MenuComp style={{marginRight:'30px'}}/>
       
       
           
            
            </div>
            <div className="flexBotons" style={{backgroundColor:'#1F4690'}}>
            <Button style={{color:'white'}} onClick={()=>setShowLab(!showLab)}>{showLab? "Hide public WC" : "Show public WC"}<img style={{marginLeft:'15px', backgroundColor:''}} src={wcIconWhi} width={28} height={35} alt='wc'/></Button>
            <Button style={{color:'white'}} onClick={()=>setShowFon(!showFon)}>{showFon? 'Hide drinking fountains' : 'Show drinking fountains'}<img style={{marginLeft:'15px'}} src={fontIconWhi} width={20} height={30} alt='fountain'/></Button>
            <Button style={{color:'white'}} onClick={()=>setShowPis(!showPis)}>{showPis? 'Hide Swimming Pools': 'Show Swimming Pools'}<img style={{marginLeft:'15px'}} src={piscIconWhi} width={30} height={30} alt='fountain'/></Button>
            </div>

            <MapContainer 
            center={center}
            zoom={ZOOM_LEVEL} 
            ref={mapRef}>

            <LayersControl>
            <BaseLayer name='Colored' checked>
              <TileLayer url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'	attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' subdomains= 'abcd'	maxZoom= '20'></TileLayer>
            </BaseLayer>

            <BaseLayer name='Grey'>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' subdomains={'abcd'}></TileLayer>
            </BaseLayer>

            <BaseLayer name='Dark'>
              <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' maxZoom= '20' attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'></TileLayer>
            </BaseLayer>

            <BaseLayer name='Satellite View'>
              <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' attribution= 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'></TileLayer>
            </BaseLayer>

            </LayersControl>


            <LocationMarker/>



        {fonts!==0&&showFon&&
            
         fonts.map((font)=>{
          const {lat,lng, _id, nom}= font;
          
          return(<Marker key={_id} position={[lat, lng]} icon={new Icon({iconUrl: fontIcon, iconSize: [10, 15], iconAnchor: [20, 30]})}>
                     <Popup  className="request-popup" >
                     {!nom&&
              <h3>Drinking fountain</h3>} 
                      <h3>{nom}</h3>
                        <button onClick={()=>getOneItem(_id)} >Get comments</button>
                   
                      <Button color="success" onClick={()=>setShowForm(!showForm)}>{showForm? 'Hide': 'Post a comment'}</Button>
                      {showForm&&
                          <Formulari API_URL={API_URL} _id={_id} user={user._id}/>
                            }
                    </Popup>
                </Marker> 
                )
            })
            }
            {piscines!==0 &&showPis&&
                
                piscines.map((piscina)=>{
                  const {lat,lng, _id, nom}= piscina;
    
                return(<Marker key={_id} position={[lng, lat]} icon={new Icon({iconUrl: iconoPiscina, iconSize:[20,25], iconAnchor:[20,30]})}>
                <Popup  className="request-popup">
                {!nom&&
              <h3>Pool</h3>}
                <h3>{nom}</h3>
                <button onClick={()=>getOneItem(_id)} >Get comments</button>
                <Button color="success" onClick={()=>setShowForm(!showForm)}>{showForm? 'Hide': 'Post a comment'}</Button>
                        {showForm&&
                          <Formulari API_URL={API_URL} _id={_id} user={user._id}/>
                          }
    
            </Popup>
                </Marker> )
                })
                } 
            

  
            {lavabos!==0 &&showLab&&
                
            lavabos.map((lavabo)=>{
              const {lat,lng, _id, nom}= lavabo;

            return(<Marker key={_id} position={[lng, lat]} icon={new Icon({iconUrl: wcIcon, iconSize:[20,25], iconAnchor:[20,30]})}>
            <Popup  className="request-popup">
            {!nom&&
              <h3>Public WC</h3>}
            <h3>{nom}</h3>
            <button onClick={()=>getOneItem(_id)} >Get Comments</button>
            <Button color="success" onClick={()=>setShowForm(!showForm)}>{showForm? 'Hide': 'Post a comment'}</Button>
                    {showForm&&
                      <Formulari API_URL={API_URL} _id={_id} user={user._id}/>
                      }

        </Popup>
            </Marker> )
            })
            }                                      

            </MapContainer>

          <div style={{display:'flex', marginTop:'36%' }}>
          
          <img style={{marginLeft:'20px'}} src={markerIcon} width={20} height={47} alt='persona'/> 
          <div style={{marginLeft:'30px', display:'flex', flexDirection:'column', marginTop:'-20px'}}>
          <h3>Where are you?</h3>
          <t style={{marginTop:'-10px'}}>Right click to know your location. In mobile hold tap.</t>
          </div>
          </div>

        </body>
    )
}

export default Maps