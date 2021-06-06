const client = require('../elastic/elastic')
const searchRouter = require('express').Router()
searchRouter.get('/', async (req,res)=>{
    const {query} = req.query
    try{
    const r = await client.search({
      index:'signals',
      body:{
        "_source": ["upc","boost"],
        size:30,
        sort: [{ "boost": { "order": "desc" } }],
        query:{
        match:{
          query:query
        }
      }
    },
    filterPath:'hits.hits._source'
    })
    var boostquery = []
    for(var i=0;i<r.body.hits.hits.length;i++){
      let boostdoc = {
        term:{
          upc:{
            value:`${r.body.hits.hits[i]._source.upc}`,
            boost:`${r.body.hits.hits[i]._source.boost}`
          }
        }
      }
      boostquery.push(boostdoc)
    }
    const result = await client.search({
        index: 'products',
        body:{
          query:{
            bool:{
              must:[{
                multi_match:{
                  query:query,
                  fields:["name","manufacturer","longDescription","shortDescription"],
                }
              }],
              should:boostquery
            }
          }
        },
        //filterPath:'hits.hits._source'        
      })
      if(result.body && result.body.hits){
        res.json(result.body.hits).status(200)
      }
      else{
        res.json([]).status(200)
      }
    }
    catch(err){
        console.log(err)
    }
})
searchRouter.get('/autosuggest', async (req,res)=>{
    try{
      const SearchParam = req.query.SearchParam
      const results = await client.search({
        index:'autosuggest',
        size:5,
        body:{
          query:{
            match:{
              searchterm:{
                query:SearchParam,
                analyzer:'standard' 
              }
            }
          }        
        },
      filterPath:'hits.hits._source'
      })
    if(results.body && results.body.hits){
      res.json(results.body.hits.hits).status(200)
    }
    else{
      res.json([]).status(200)
    }
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})
module.exports = searchRouter