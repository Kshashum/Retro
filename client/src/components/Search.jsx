import {React,useState,useEffect} from 'react'
import './Search.css'
import { useStateValue } from '../context/StateContext';
import {Checkbox, FormControlLabel, FormGroup, Typography, Button} from '@material-ui/core'
import SearchItem from './SearchItem';
const Search = () => {
    const [{searchlist,price100_200,price200_300,price300_500},dispatch]= useStateValue()
    const [facet1,setFacet1] = useState(false)
    const [facet2,setFacet2] = useState(false)
    const [facet3,setFacet3] = useState(false)
    const [facet4,setFacet4] = useState(false)
    const [facet5,setFacet5] = useState(false)
    const handleChange = (e)=>{
        if (e.target.name==='100_200'){
            setFacet1(true)
            setFacet2(false)
            setFacet3(false)
            dispatch({
                type:'ADD_FILTER',
                item:{gte:100,lte:200}
            })
        }
        else if (e.target.name==='200_300'){
            setFacet1(false)
            setFacet2(true)
            setFacet3(false)
            dispatch({
                type:'ADD_FILTER',
                item:{gte:200,lte:300}
            })
        }
        else if (e.target.name==='300_500') {
            setFacet1(false)
            setFacet2(false)
            setFacet3(true)
            dispatch({
                type:'ADD_FILTER',
                item:{gte:300,lte:500}
            })
        }
        else if (e.target.name === 'asc'){
            setFacet4(true)
            setFacet5(false)
            dispatch({
                type:"SORT",
                item:"asc"
            })
        }
        else{
            setFacet4(false)
            setFacet5(true)
            dispatch({
                type:"SORT",
                item:"desc"
            })
        }
    }
    const mapper = (item)=>{
        return <SearchItem productid={item.productid} name={item.name} img={item.img} price={item.price}/>
    }
    const searchitems = searchlist.map((item)=>mapper(item))
    return (
        <div className="search">
            <div className="search_left">
                <Typography variant='h4'>Filters</Typography >
                <Typography variant='h6' style={{marginTop:"3px"}}>Price</Typography >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={facet1} onChange={(e)=>handleChange(e)} name="100_200" />}
            label={`100 to 200 (${price100_200})`}
          />
        <FormControlLabel
            control={<Checkbox checked={facet2} onChange={(e)=>handleChange(e)} name="200_300" />}
            label={`200 to 300 (${price200_300})`}
          />
        <FormControlLabel
            control={<Checkbox checked={facet3}onChange={(e)=>handleChange(e)} name="300_500" />}
            label={`300 to 500 (${price300_500})`}
          />
        <Typography variant='h6' style={{marginTop:"3px"}}>Sort</Typography >
        <FormControlLabel
            control={<Checkbox checked={facet4} onChange={(e)=>handleChange(e)} name="asc" />}
            label="Asc"
          />
        <FormControlLabel
            control={<Checkbox checked={facet5} onChange={(e)=>handleChange(e)} name="desc" />}
            label="Dsc"
          />
        <Button type="submit" variant="contained" color="primary" style={{width:"100px"}} onClick={(e)=>{dispatch({type:"DO_SEARCH"})}}>Search</Button>
        </FormGroup>
            </div>
            <div className="search_right">
                <div>
                <Typography variant='h4'>Search Results</Typography>
                {searchitems.length>0?searchitems:<p>There are no Items matching this search</p>}
                </div>
            </div>
        </div>
    )
}

export default Search
