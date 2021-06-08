import React from 'react'
import { useStateValue } from '../context/StateContext'
import './CartItem.css'
import {useHistory} from 'react-router-dom'
import {Button} from '@material-ui/core'
const SearchItem = ({productid,name,img,price}) => {
    const history = useHistory()
    const [state,dispatch]=useStateValue()
    const addtocart = (e) =>{
        e.stopPropagation()
        dispatch({
            type:"ADD_TO_CART",
            item:{
                productid,
                name,
                price,
                img:"https://source.unsplash.com/random/",
                quantity:1
            }
        })
    }
    return (
        <div className="cartitem" onClick={()=>{history.push(`/p/${productid}`)}}>
            <img src={img} alt="cartitem" className="cartitem_img"/>
            <div className="cartinfo">
            <p>{name}</p>
            <p>Price <strong>${price}</strong></p>
            <Button variant="contained" color="primary" onClick={(e)=>{addtocart(e)}}>
                Add to Cart
            </Button>
            </div>
        </div>
    )
}

export default SearchItem
