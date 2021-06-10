import { TextField, Typography } from '@material-ui/core'
import {React, useState, useEffect} from 'react'
import './Checkout.css'
import axios from 'axios'
import { useStateValue } from '../context/StateContext'

const Checkout = () => {
    const [state,dispatch]=useStateValue()
    useEffect(async ()=>{
        if (state.cartid.length===0){
        await axios.post('http://localhost:4000/api/v1/cart/',{},{
            headers: {
                token:state.token
            }
        }).then(res=>{
            if(res.data.rows){
                dispatch({
                    type:"CARTID",
                    item:res.data.rows[0].cartid
                })
            }
        })
    }
    if (state.cart){
        state.cart.forEach(item => {
            axios.put('http://localhost:4000/api/v1/cart/',{body:{cartid:state.cartid,productid:item.productid,quantity:1}},{headers:{token:state.token}})
        });
    }
    },[state.cart])
    const handleSubmit=(e)=>{

    }
    return (
        <div className="main_check">
            <form className="checkout_form">
            <Typography variant='p' style={{marginTop:"5px"}}>Name</Typography>
            <TextField></TextField>
            <Typography variant='p' style={{marginTop:"5px"}}>Address</Typography>
            <TextField></TextField>
            <Typography variant='p' style={{marginTop:"5px"}}>Pincode</Typography>
            <TextField></TextField>
            <button type="submit" class="checkout_button" onSubmit={(e)=>{handleSubmit(e)}}>Submit</button>
            </form>
        </div>
    )
}

export default Checkout
