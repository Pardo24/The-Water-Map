import StarRating from "./starRating"
import {Cloudinary} from "@cloudinary/url-gen";
import {useState} from 'react'
import axios from "axios";
import { Button } from "@mui/material";

function Formulari(props){
const [rating, setRating]= useState(0)
const [title, setTitle] = useState('')
const [content, setContent] = useState('')
const [photo, setPhoto] = useState('')



const knowRating=(ratingnum) => setRating(ratingnum)


  const  handleSubmit=(e)=>{
    e.preventDefault()

    const body = {rating:rating , title:title , content:content , photo:photo, labafont:props._id} //no se com treure el user id per al comentari
    const storedToken = localStorage.getItem('authToken');

    axios   
    .post(`${props.API_URL}/lavafont/${props._id}`, body, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(()=>{
      setContent('')
      setTitle('')
      setPhoto('')
      setRating(0)})
  }



    return(
        
            <div style={{textAlign:'center'}}>
                    <h4><b>Post a comment:</b></h4>
                    <form  onSubmit={handleSubmit} >

                    <StarRating knowRating={knowRating}  />

                    <br/><input placeholder={"Title"} 
                    type={"text"} 
                    name={"title"}
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                     />

                     <br/>

                    <input 
                    type={'file'} 
                    name={"photo"}
                    accept='image/*'
                    value={photo}
                    onChange={(e)=> setPhoto(e.target.value)}
                    />

                    <br/>
                    <br/>
                    <textarea 
                    placeholder={"Comment"} 
                    type={"text"} 
                    name={"content"}
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
                    ></textarea> 

                    <br/>
                    <Button type="submit" variant="contained" color="success">Post</Button>
                   
                    </form> 
            </div>
    )
}



export default Formulari