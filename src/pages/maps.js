import React, { useRef } from "react"
import {MapContainer, TileLayer} from 'react-leaflet'
import {useState} from 'react'
import 'leaflet/dist/leaflet.css'
import { Popup, Marker } from "react-leaflet"
import {useMapEvents} from 'react-leaflet'
import markerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png"
import {icon, Icon} from 'leaflet'
import {FontIcon, WcIcon} from '../components/icons'





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
const [center, setCenter] = useState({ lat: 41.38201718772406,  lng: 2.140611050113362})
const ZOOM_LEVEL =14 
const mapRef = useRef()
                                                //falta cridar a la base de dades i treure totes les fonts i lavabos emmagatzemats

return(
        <>
        <h2 style={{textAlign:"center", marginBottom:"60px", marginTop:"30px"}}> <text className="">Barna<text style={{color: "red"}}>[nav]</text></text></h2>
            <MapContainer 
            center={center}
            zoom={ZOOM_LEVEL} 
            ref={mapRef}
            >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' subdomains={'abcd'}></TileLayer>
            <LocationMarker/>
{/*         {
            <Marker position={[{}, {}]} icon={<FontIcon/>}/> //fer un map i posar la posicio per cadascuna
            }

            {
            <Marker position={[{}, {}]} icon={<WcIcon/>}/> //fer un map i posar la posicio per cadascun
            }                                     
*/}
            </MapContainer>
        </>
    )
}

export default Maps