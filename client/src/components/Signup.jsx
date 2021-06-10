import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import './Signup.css'
import { useStateValue } from '../context/StateContext'
import {TextField, Typography, Button} from '@material-ui/core'
import background from '../background.jpeg'
import logo from "../logo.png"

const Signup = () => {
    const [{login},dispatch]=useStateValue()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    useEffect(() => {
        if (login) {
            history.push('/')
        }
    }, [login, history])
    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:4000/api/v1/auth/register', { name, email, password }).then((res) => { return res.data }).then((data) => {
            dispatch({
                type:"AUTHORIZE",
                item:{
                    token:data.token,
                    userid:data.userid,
                    name:data.name
                }
            })
        }).catch(err => { console.log(err.message) })
    }

    return (
        <div className='signup'>
        <img src={background} alt="background" className="signup_image"/>
        <div className="container" >
            <div className="signup_split">
            <Typography variant="h4">Sign up</Typography>
            <form className="signup_form">
            <Typography variant='h6' style={{marginTop:"5px"}}>Name</Typography>
                    <TextField
                        className="form-control"
                        type="text"
                        placeholder="name"
                        name="name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    ></TextField>
                    <Typography variant='h6' style={{marginTop:"5px"}}>Email</Typography>
                    <TextField
                        type="email"
                        style={{marginTop:"5px"}}
                        placeholder="something@mail.com"
                        name="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    ></TextField>
                    <Typography variant='h6' style={{marginTop:"5px"}}>Password</Typography>
                    <TextField
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        style={{marginTop:"5px"}}
                    ></TextField>
                    <Button style={{backgroundColor: '#f0c14b', color: '#111', width:"30%",marginTop:"10px"}} onClick={handleSubmit}>Submit</Button>
            </form>
            </div>
            <img src={logo} alt="logo" />
        </div>
        </div>
    )
}

export default Signup
