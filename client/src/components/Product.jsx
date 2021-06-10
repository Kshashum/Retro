import React from 'react'
import './Product.css'
import {Button} from '@material-ui/core'
import { useStateValue } from '../context/StateContext'
import {useHistory} from 'react-router-dom'
const Product = ({productid,name,shortDescription,price}) => {
    const [state,dispatch]=useStateValue()
    const history = useHistory()
    const addtocart = (e) =>{
        e.stopPropagation()
        dispatch({
            type:"ADD_TO_CART",
            item:{
                productid,
                name,
                shortDescription,
                price,
                img:"https://source.unsplash.com/random/450x450/"
            }
        })
    }
    return (
        <div className="product" onClick={()=>{history.push(`/p/${productid}`)}}>
            <div className="product_name">
                <p>{name}</p>
            </div>
            <div className="product_info">
                <p>{shortDescription}</p>
            </div>
            <div className="product_price">
                <small>$</small>
                <strong>{price}</strong>
            </div>
            <img src="https://source.unsplash.com/random/450x450/" alt='product' />
            <Button variant="contained" color="primary" onClick={(e)=>{addtocart(e)}}>
                Add to Cart
            </Button>
        </div>
    )
}

export default Product
