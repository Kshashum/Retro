import React from 'react'
import './Cart.css'
import { useStateValue } from '../context/StateContext';
import CartItem from './CartItem';
import {Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
const Cart = () => {
    const [{cart,login}]= useStateValue()
    const mapper = (item)=>{
        return <CartItem productid={item.productid} name={item.name} img={item.img} price={item.price}/>
    }
    const cartitems = cart.map((item)=>mapper(item))
    return (
        <div className="cart">
            <div className="cart_left">
                <div>
                <Typography variant='h4'>Shopping Cart</Typography>
                {cartitems.length>0?cartitems:<Typography variant='p'>There are no Items in the cart!!</Typography>}
                </div>
            </div>
            <div className="cart_right">
                <div className="subtotal">
                    <p>Subtotal ({cart.length>0?cart.length:0} items): <strong>${cart.length>0?cart.reduce((total,item)=>{return total+parseInt(item.price)},0):0}</strong></p>
                    <Link to={login?'/checkout':'/login'}>
                    <button class="cart_button">Proceed to check out</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart
