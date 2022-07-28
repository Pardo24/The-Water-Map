import StarRating from "./starRating"
import {Cloudinary} from "@cloudinary/url-gen";
import {useState, useEffect} from 'react'
import axios from "axios";
import { Button } from "@mui/material";

function Formulari(props){
const [rating, setRating]= useState(0)
const [title, setTitle] = useState('')
const [content, setContent] = useState('')
const [photo, setPhoto] = useState('')


const uploadImage = async (e) =>{
      const files = e.target.files;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'watermap')
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/patufet/image/upload',
        { 
            method: 'POST',
            body: data
        }
      )
      const file = await res.json();
      setPhoto(file.secure_url)
     await props.knowPhoto(photo)
}

const knowRating=(ratingnum) => setRating(ratingnum)


  const  handleSubmit=(e)=>{
    e.preventDefault()

    const body = {rating:rating , title:title , content:content , photo:photo, labafont:props._id, user:props.user} 
    const storedToken = localStorage.getItem('authToken');

    if(!props.editData){axios   
    .post(`${props.API_URL}/lavafont/${props._id}`, body, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(()=>{
      setContent('')
      setTitle('')
      setPhoto('')
      setRating(0)
    
    })}
    else{
      const body = {rating:rating, title:title, content:content, photo:photo}
      axios   
    .put(`${props.API_URL}/comments/${props.id}`, body, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(()=>{
      setContent('')
      setTitle('')
      setPhoto('')
      setRating(0)
    })}
  }

  const edit =() =>{
    if(props.editData){
      setContent(props.editData.content)
      setTitle(props.editData.title)
      setPhoto(props.editData.photo)
      setRating(props.editData.rating)

    }
  }


    return(
        
            <div  style={{textAlign:'center', borderRadius: '20px', border:'solid 1px black',padding:'10px 30px' ,margin:'10px 5px' }}>
                    {props.editData&&
                      <><h4><b>Edit your comment:</b></h4>{()=>edit}</>}
                      {!props.editData&&
                      <h4><b>Post a comment:</b></h4>}
                    
                    <form  onSubmit={handleSubmit} >

                    <StarRating knowRating={knowRating}  />
                    <br/>
                    
                    <label for="file-upload" className="custom-file-upload">
                     Upload Image 
                    </label>
                    <input 
                    id="file-upload"
                    type={'file'} 
                    name={"photo"}
                    filename={photo}
                    onChange={uploadImage}
                    />

                    
                    <br/><br/>
                    <input placeholder={"Title"} 
                    type={"text"} 
                    name={"title"}
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
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
                    <Button type="submit" style={{marginBottom:'10px'}} variant="contained" color="success">Post</Button>
                   
                    </form> 
            </div>
    )
}



export default Formulari