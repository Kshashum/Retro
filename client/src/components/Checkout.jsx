import { TextField, Typography } from '@material-ui/core'
import {React, useState, useEffect} from 'react'
import './Checkout.css'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useStateValue } from '../context/StateContext'

const Checkout = () => {
    const [state,dispatch]=useStateValue()
    const [name,setName] = useState()
    const [address,setAddress] = useState()
    const [pincode,setPincode] = useState()
    const history = useHistory()
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
    },[state.cart])
    useEffect(()=>{
        if(state.cartid.length>0){
            if (state.cart){
                state.cart.forEach(item => {
                    axios.put('http://localhost:4000/api/v1/cart/',{body:{cartid:state.cartid,productid:item.productid,quantity:2}},{headers:{token:state.token}})
                });
            }
            if (state.removecart){
                state.removecart.forEach(item => {
                    axios.put('http://localhost:4000/api/v1/cart/',{body:{cartid:state.cartid,productid:item.productid,quantity:0}},{headers:{token:state.token}})
                    dispatch({
                        type:"DELETE_FROM_CART",
                        item:item
                    })
                });
            }
        }
    },[state.cartid])
    const handleSubmit= async (e)=>{
        e.preventDefault()
        axios.post(`http://localhost:4000/api/v1/order/`,{body:{address,name,pincode,cartid:state.cartid}},{headers:{token:state.token}}).then((res)=>{
            history.push(`/order/${res.data.rows[0].orderid}`)
            dispatch({
                type:"EMPTY_CART",
            })
        }).catch(err=>console.log(err.message)
        )
    }
    return (
        <div className="main_check">
            <form className="checkout_form" onSubmit={(e)=>{handleSubmit(e)}}>
            <Typography variant='p' style={{marginTop:"5px"}}>Name</Typography>
            <TextField value={name} onChange={(e)=>setName(e.target.value)}></TextField>
            <Typography variant='p' style={{marginTop:"5px"}}>Address</Typography>
            <TextField value={address} onChange={(e)=>setAddress(e.target.value)}></TextField>
            <Typography variant='p' style={{marginTop:"5px"}}>Pincode</Typography>
            <TextField value={pincode} onChange={(e)=>setPincode(e.target.value)}></TextField>
            <button type="submit" class="checkout_button" onSubmit={(e)=>{handleSubmit(e)}}>Submit</button>
            </form>
        </div>
    )
}

export default Checkout
