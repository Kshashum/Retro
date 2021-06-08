import React from 'react'
import { useStateValue } from '../context/StateContext'
import {useHistory} from 'react-router-dom'
import './CartItem.css'

const CartItem = ({productid,name,img,price}) => {
    const history = useHistory()
    const [state,dispatch]=useStateValue()
    const handleRemove = (e) =>{
        e.stopPropagation();
        dispatch({
            type:"REMOVE_FROM_CART",
            item:{
                productid,
                quantity:-1
            }
        })
    }
    return (
        <div className="cartitem" onClick={()=>{history.push(`/p/${productid}`)}}>
            <img src={img} alt="cartitem" className="cartitem_img"/>
            <div className="cartinfo">
            <p>{name}</p>
            <p>Price <strong>${price}</strong></p>
            <button className="btn" type="button" onClick={(e)=>{handleRemove(e)}}>Remove</button>
            </div>
        </div>
    )
}

export default CartItem
