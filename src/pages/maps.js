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


const API_URL = "http://localhost:5005/api";





function LocationMarker() {
  const [position, setPosition] = useState(null)
const map = useMapEvents({
    dblclick() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 17)
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
const ZOOM_LEVEL =14 
const mapRef = useRef()
const { 
  isLoggedIn,
  user,                  
  logOutUser             
} = useContext(AuthContext);

const {BaseLayer} = LayersControl


const getOneItem=(_id)=> {

    const storedToken = localStorage.getItem('authToken');

    axios.get(`${API_URL}/lavafont/${_id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        
    .then((response)=>{setDataApi(response.data)
                      console.log(dataApi)
                      
                (dataApi&& 

                dataApi.comments.map((cadaComment)=>{
                return(
                  <>
                    <t>{cadaComment.user}</t>

                    {cadaComment.photo!==0&&(

                    cadaComment.photo.map((image)=>(<img src={image} alt='no img'/>)))}

                    <h6>{cadaComment.title}</h6>
                    <p>{cadaComment.content}</p>
                  </>
                    )
                  }))
                
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
        <>
        <div className="footergran">
        <h2 style={{alignitems:'center',marginLeft:'45%',textAlign:"center", marginBottom:"60px", marginTop:"30px"}}> <text style={{color: "darkblue"}}>Water<text style={{color: "black"}}>[map]</text></text></h2>
        
        {isLoggedIn && (
            <><Button style={{alignSelf:'center',marginLeft: '35%', fontWeight:'600'}} onClick={()=>logOutUser()}>Logout</Button></>
        )}
        {!isLoggedIn && (
            <>
            <Link to="/login" style={{alignSelf:'center',marginLeft: '30%', fontWeight:'600'}}><Button >Login</Button></Link><Link to='/signup' style={{alignSelf:'center',  marginLeft: '10px',fontWeight:'600'}}><Button >Sign Up</Button></Link>
            </>
            )}
            
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



        {fonts!==0&&
            
         fonts.map((font)=>{
          const {lat,lng, _id, nom}= font;
          
          return(<Marker onClick={()=>getOneItem(_id)} key={_id} position={[lat, lng]} icon={new Icon({iconUrl: fontIcon, iconSize: [10, 15], iconAnchor: [20, 30]})}>
                     <Popup  className="request-popup" >
                     {!nom&&
              <h3>Drinking fountain</h3>} 
                      <h3>{nom}</h3>
                        <button onClick={()=>getOneItem(_id)} >a</button>
                   
                      <Button color="success" onClick={()=>setShowForm(!showForm)}>{showForm? 'Hide': 'Post a comment'}</Button>
                      {showForm&&
                          <Formulari API_URL={API_URL} _id={_id}/>
                            }
                    </Popup>
                </Marker> 
                )
            })
            }
            {piscines!==0 &&
                
                piscines.map((piscina)=>{
                  const {lat,lng, _id, nom}= piscina;
    
                return(<Marker key={_id} position={[lng, lat]} icon={new Icon({iconUrl: iconoPiscina, iconSize:[20,25], iconAnchor:[20,30]})}>
                <Popup  className="request-popup">
                {!nom&&
              <h3>Pool</h3>}
                <h3>{nom}</h3>
                <button onClick={()=>getOneItem(_id)} >a</button>
                <Button color="success" onClick={()=>setShowForm(!showForm)}>{showForm? 'Hide': 'Post a comment'}</Button>
                        {showForm&&
                          <Formulari API_URL={API_URL} _id={_id}/>
                          }
    
            </Popup>
                </Marker> )
                })
                } 
            

  
            {lavabos!==0 &&
                
            lavabos.map((lavabo)=>{
              const {lat,lng, _id, nom}= lavabo;

            return(<Marker key={_id} position={[lng, lat]} icon={new Icon({iconUrl: wcIcon, iconSize:[20,25], iconAnchor:[20,30]})}>
            <Popup  className="request-popup">
            {!nom&&
              <h3>Public WC</h3>}
            <h3>{nom}</h3>
            <button onClick={()=>getOneItem(_id)} >a</button>
            <Button color="success" onClick={()=>setShowForm(!showForm)}>{showForm? 'Hide': 'Post a comment'}</Button>
                    {showForm&&
                      <Formulari API_URL={API_URL} _id={_id}/>
                      }

        </Popup>
            </Marker> )
            })
            }                                      

            </MapContainer>
        </>
    )
}

export default Maps