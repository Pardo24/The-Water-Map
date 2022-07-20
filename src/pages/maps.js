import React, { useRef } from "react"
import {MapContainer, TileLayer} from 'react-leaflet'
import {useState, useEffect} from 'react'
import 'leaflet/dist/leaflet.css'
import { Popup, Marker } from "react-leaflet"
import {useMapEvents} from 'react-leaflet'
import markerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png"
import {icon, Icon} from 'leaflet'
import axios from "axios";
import wcIcon from '../pictures/wc-icon.png'
import fontIcon from '../pictures/font-icon.png'

const API_URL = "http://localhost:5005/api";


function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position} icon={new Icon({iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        <Popup>You are here</Popup>
      </Marker>
     
    )
  }

function Maps(){
const [lavabos, setLavabos] = useState([])
const [fonts, setFonts]= useState([])
const [center, setCenter] = useState({ lat: 41.38201718772406,  lng: 2.140611050113362})
const ZOOM_LEVEL =14 
const mapRef = useRef()



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
                                                //falta cridar a la base de dades i treure totes les fonts i lavabos emmagatzemats
                                               
return(
        <>
        <h2 style={{textAlign:"center", marginBottom:"60px", marginTop:"30px"}}> <text className=""style={{color: "darkblue"}}>Water<text style={{color: "black"}}>[map]</text></text></h2>
            <MapContainer 
            center={center}
            zoom={ZOOM_LEVEL} 
            ref={mapRef}
            >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' subdomains={'abcd'}></TileLayer>
            <LocationMarker/>

        {fonts!==0&&ZOOM_LEVEL>10&&

         fonts.map((font)=>{
          const {lat,lng}= font;
          
          return(<Marker position={[lat, lng]} icon={new Icon({iconUrl: fontIcon, iconSize: [10, 15], iconAnchor: [20, 30]})}/> )
            })
            }

  
            {lavabos!==0 &&
                
            lavabos.map((lavabo)=>{
              const {lat,lng}= lavabo;
            return(<Marker position={[lng, lat]} icon={new Icon({iconUrl: wcIcon, iconSize:[30,30], iconAnchor:[20,30]})}/> )
            })
            }                                      

            </MapContainer>
        </>
    )
}

export default Maps