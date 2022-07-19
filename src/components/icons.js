import { Icon } from "leaflet";
import wcIcon from '../pictures/wc-icon.png'
import fontIcon from '../pictures/font-icon.png'




function WcIcon(){

    return(
        <>
            {new Icon({iconUrl: wcIcon, iconSize: [30, 30], iconAnchor: [20, 30]})}
        </>
    )
}

function FontIcon(){

    return(
        <>
            {new Icon({iconUrl: fontIcon, iconSize:[30,30], iconAnchor:[20,30]})}
        </>
    )
}


export {FontIcon, WcIcon}