import React from 'react'
import './Search.css'
import { useStateValue } from '../context/StateContext';
import {Typography} from '@material-ui/core'
import SearchItem from './SearchItem';
const Search = () => {
    const [{searchlist},dispatch]= useStateValue()
    const mapper = (item)=>{
        return <SearchItem productid={item.productid} name={item.name} img={item.img} price={item.price}/>
    }
    const searchitems = searchlist.map((item)=>mapper(item))
    return (
        <div className="search">
            <div className="search_left">
                <div>
                <Typography variant='h4'>Search Results</Typography>
                {searchitems.length>0?searchitems:<p>There are no Items matching this search</p>}
                </div>
            </div>
        </div>
    )
}

export default Search
