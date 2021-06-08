import {React,useState,useEffect} from 'react'
import './Navbar.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom';
import logo from '../logo.png'
import { useStateValue } from '../context/StateContext';
import {useHistory} from 'react-router-dom'
import {TextField,Button, makeStyles} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import axios from 'axios';
const Navbar = () => {
    const useStyles = makeStyles(() => ({
        root: {
            marginBottom:"15px",
          "& .MuiFilledInput-root": {
            backgroundColor: "white"
          },
          "& .MuiFilledInput-root:hover": {
            backgroundColor: "white",
            "@media (hover: none)": {
              backgroundColor: "white"
            }
          },
          "& .MuiFilledInput-root.Mui-focused": {
            backgroundColor: "white"
          }
        }
      }));
    const classes = useStyles()
    const [{cart,name,login,autocomplete}, dispatch]=useStateValue()
    const history = useHistory()
    const [search, setsearch] = useState()
    const handleSearch=(e)=>{
        e.preventDefault()
        if (search){
            axios.get("http://localhost:4000/api/v1/search/",{ params: { query: search } }).then((res)=>{  
            if(res.data.hits.length>0){
                    dispatch({
                        type:"SEARCH",
                        item:res.data.hits.map((item)=>{return {...item._source,img:"https://source.unsplash.com/random/"}})
                    })
                }
            else{
                dispatch({
                        type:"SEARCH",
                        item:[]
                    })
                }
            })
        }
        history.push('/s')
    }
    useEffect(() => {
        if (search && search.length>2){
            axios.get("http://localhost:4000/api/v1/search/autosuggest",{ params: { SearchParam: search } }).then((res)=>{   
            if(res.data.length>0){
                    dispatch({
                        type:"AUTOCOMPLETE",
                        item:res.data.map((item)=>{return item._source.searchterm})
                    })
                }
            })
        }
        else{
            dispatch({
                type:"AUTOCOMPLETE",
                item:[]
            })
        }
    }, [search,dispatch])
    return (
    <div className="navbar">
        <Link to="/">
        <img src={logo} alt="logo" className="navbar_image"/>
        </Link>
            <form className="navbar_search" onSubmit={(e)=>{handleSearch(e)}}>
      <Autocomplete
      freeSolo
        style={{ width: "100%"}}
        options={autocomplete.map((option) => option)}
        renderInput={(params) => (
          <TextField {...params} label="Search" margin="normal" variant="filled" size="medium" value={search} onChange={(e)=>{setsearch(e.target.value)}} className={classes.root} />
        )}
      />
      <Button onSubmit={(e)=>{handleSearch(e)}}><SearchIcon className="navbar_searchicon"/></Button>
            </form>
        <div className="navbar_head">
            {login?<div className="navbar_options">
                <span className="navbar_optionslineone">Hello {name}!</span>
                <p className="navbar_optionslinetwo" onClick={()=>{dispatch({type:"LOGOUT"})}}>Logout</p>
            </div>:
            <div className="navbar_options">
                <span className="navbar_optionslineone">Hello Guest!</span>
                <Link to='/login'><p className="navbar_optionslinetwo">login</p></Link>
            </div>}
            <div className="navbar_shoppingcart" style={{flexDirection:'row'}}>
                <Link to="/cart" className="navbar_shoppingcart">
                <ShoppingCartIcon/>
                <p className="navbar_optionslinetwo navbar_cartcount">{cart.length}</p>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default Navbar
