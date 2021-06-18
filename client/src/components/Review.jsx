import {Typography } from '@material-ui/core'
import React from 'react'
import './Login.css'

const Review = ({name,review,rating}) => { 
    return (
        <div className='' style={{display:'flex',flexDirection:'column',width:"100%",marginLeft:"5px",marginTop:'1px',boxShadow:"none",backgroundColor:"#dedfff",marginBottom:"10px"}}>
            <Typography variant="p"><strong>Review: </strong>{review}</Typography>
            <Typography variant="p"><strong>Rating: </strong>{rating}</Typography>
            <Typography variant="p"><strong>User: </strong>{name}</Typography>    
        </div>
    )
}

export default Review
