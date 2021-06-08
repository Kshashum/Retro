import {Typography } from '@material-ui/core'
import React from 'react'
import './Login.css'

const Review = ({name,review,rating}) => { 
    return (
        <div className='container' style={{display:'flex',flexDirection:'column',width:"70%",marginLeft:"5px",marginTop:'5px',boxShadow:"none",backgroundColor:"#D6CFC7",marginBottom:"10px",backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2),#f0c14b)"}}>
            <Typography variant="h5">{review}</Typography>
            <Typography variant="p"><strong>Rating: </strong>{rating}</Typography>
            <Typography variant="p">{name}</Typography>    
        </div>
    )
}

export default Review
