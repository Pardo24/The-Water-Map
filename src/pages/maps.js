import React, { useRef } from "react"
import {MapContainer, TileLayer, LayersControl} from 'react-leaflet'
import {useState, useEffect} from 'react'
import 'leaflet/dist/leaflet.css'
import { Popup, Marker } from "react-leaflet"
import {useMapEvents} from 'react-leaflet'
import markerIcon from "../pictures/persona.png"
import {icon, Icon, marker, popup} from 'leaflet'
import axios from "axios";
import wcIcon from '../pictures/wc-icon.png'
import fontIcon from '../pictures/font-icon.png'
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { Button } from "@mui/material"
import Formulari from "../components/formulari"

{/* <div>
                    <h4>Post a comment:</h4>
                    <form method="POST" action={`${API_URL}/lavafont/${_id}`}>

                    <StarRating/>
                    
                    <br/><input placeholder={"Title"} type={"text"} name={"title"} /><br/>
                    <br/><textarea placeholder={"Comment"} type={"text"} name={"content"}></textarea> 
                    
                    </form> 
          
                   
                    </div> */} //FORMULARI


const API_URL = "http://localhost:5005/api";





function LocationMarker() {
  const [position, setPosition] = useState(null)
const map = useMapEvents({
    click() {
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
const [showForm, setShowForm] = useState(false)
const [center, setCenter] = useState({ lat: 41.38201718772406,  lng: 2.140611050113362})
const ZOOM_LEVEL =14 
const mapRef = useRef()

const {BaseLayer} = LayersControl

const getOneItem=(_id)=> {axios.get(`${API_URL}/labafont/${_id}`)
.then((response)=>{
  console.log(response)
})}

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

useEffect(() => {
  getAllFonts();
  getAllLavabos();
}, [] );
                                              
                                               
return(
        <><div className="footergran">
        <h2 style={{alignitems:'center',marginLeft:'45%',textAlign:"center", marginBottom:"60px", marginTop:"30px"}}> <text style={{color: "darkblue"}}>Water<text style={{color: "black"}}>[map]</text></text></h2><Button style={{marginLeft: '35%', fontWeight:'600'}}>Login</Button><Button style={{ marginLeft: '10px',fontWeight:'600'}}>Sign Up</Button>
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
          const {lat,lng, _id}= font;
          
          return(<Marker key={_id} position={[lat, lng]} icon={new Icon({iconUrl: fontIcon, iconSize: [10, 15], iconAnchor: [20, 30]})}>
                    <Popup className="request-popup" > 
                   {Popup&&
                   getOneItem(_id)
                   }
                   
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
              const {lat,lng, _id}= lavabo;
            return(<Marker key={_id} position={[lng, lat]} icon={new Icon({iconUrl: wcIcon, iconSize:[20,25], iconAnchor:[20,30]})}>
            <Popup className="request-popup">
          <div >
        
            <Button color="success" onClick={()=>setShowForm(!showForm)}>{showForm? 'Hide': 'Post a comment'}</Button>
                    {showForm&&
                      <Formulari API_URL={API_URL} _id={_id}/>
                      }
        </div>
        </Popup>
            </Marker> )
            })
            }                                      

            </MapContainer>
        </>
    )
}

export default Maps