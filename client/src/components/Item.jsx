import { Typography, Button, TextField } from '@material-ui/core'
import axios from 'axios'
import {React,useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { useStateValue } from '../context/StateContext'
import './Item.css'
import Review from './Review'
const Item = () => {
    const {productid} = useParams()
    const [data, setdata] = useState({productid:productid,name:"",price:0,shortdescription:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",longdescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",img:"",manufacturer:""})
    const [reviews,setReviews] = useState([])
    const [review,setReview]=useState("")
    const [rating,setRating]=useState(0)
    const [reviewGiven,setReviewGiven]=useState(false)
    const [state,dispatch]=useStateValue()
    const addtocart = (e) =>{
        e.preventDefault()
        dispatch({
            type:"ADD_TO_CART",
            item:{
                productid:data.productid,
                name:data.name,
                shortDescription:data.shortDescription,
                price:data.price,
                img:data.img
            }
        })
    }
    const handleReview = async (e)=>{
        e.preventDefault()
            await axios.post(`http://localhost:4000/api/v1/reviews/`,{
                userid:state.userid,
                name:state.name,
                productid: productid,
                review:review,
                rating:rating
            }, {
                headers: {
                    token:state.token
                }
            })
            setReviews([...reviews,<Review name={state.name} review={review} rating={rating}/>])
            setReviewGiven(true)
    }
    useEffect(()=>{
        axios.get(`http://localhost:4000/api/v1/products/${productid}`).then(res=>{
            if(res.data){
                setdata((data)=>{
                    return {
                        name:res.data[0].name,
                        price:res.data[0].price,
                        shortdescription:res.data[0].shortdescription.length>6?res.data[0].shortdescription:data.shortdescription,
                        longdescription:res.data[0].longdescription.length>6?res.data[0].longdescription:data.longdescription,
                        manufacturer:res.data[0].length>4?res.data[0].manufacturer:data.manufacturer,
                        img:"https://source.unsplash.com/random/"
                    }
                })
            }
        })
        axios.get(`http://localhost:4000/api/v1/reviews/${productid}`).then(res=>{
            if(res.data){
                console.log(res.data)
                if(res.data.some(review => {return review.userid === state.userid})){
                    setReviewGiven(true)
                }
                setReviews(()=>{
                    return  res.data.map((item)=>{
                        return <Review name={item.name} review={item.review} rating={item.rating}/>})
                })
            }
        })
    },[])
    return (
        <div className="cnt">
            <div className="item">
                <Typography variant='h5'>{data.name}</Typography>
                <div className='item_row'>
                    <img src={data.img} alt="product image"/>
                    <div className='item_info'>
                    <Typography variant="p"><strong>Short Description</strong> {data.shortdescription}</Typography>
                    <Typography variant="p"><strong>Long Description</strong> {data.longdescription}</Typography>
                    <Typography variant="p"><strong>manufacturer</strong> {data.manufacturer}</Typography>
                    <Typography varaint='h3'><strong>$</strong> {data.price}</Typography>
                    <Button variant="contained" color="primary" onClick={(e)=>addtocart(e)}>
                Add to Cart
            </Button>
                    </div>
                </div>
            </div>
            <div className="item">
                <Typography variant='h5'>Reviews</Typography>
                {reviews.length>0?reviews:<Typography variant='p'>No Reviews Avaliable for this product</Typography>}
                {state.login && !reviewGiven &&<form style={{marginTop:"15px",display:'flex',flexDirection:'column',backgroundColor:'#F0F0F0'}} onSubmit={(e)=>{handleReview(e)}}>
                <TextField placeholder="write a review" style={{marginLeft:'5px'}} value={review} onChange={(e)=>{setReview(e.target.value)}}></TextField>
                <TextField placeholder="rating in number" style={{marginLeft:'5px'}} value={rating} onChange={(e)=>{setRating(e.target.value)}}></TextField>
                <Button color="primary" variant="outlined" size="small" style={{marginTop:"5px"}} onClick={(e)=>{handleReview(e)}}>Submit</Button>
                </form>}
            </div>
        </div>
    )
}

export default Item
