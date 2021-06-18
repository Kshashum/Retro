const pool = require("../postgres/db");
const client = require("./elastic");

const elasticingest = async () =>{
    try{
    let data = await pool.query("SELECT productid,upc,LOWER(name) as name,LOWER(manufacturer) as manufacturer,LOWER(shortDescription) as shortDescription,LOWER(longDescription) as longDescription,Price FROM PRODUCTS")
    await client.indices.delete({
      index: '_all'
  },{ ignore: [400] })
  console.log('deleted all indicies')
    await client.indices.create({
        index: 'products',
        body: {
            settings: {
             analysis: {
              filter: {
                englishStopWords: {
                type: "stop",
                stopwords: "_english_"
               }
              },
              analyzer: {
               eventNameAnalyzer: {
                tokenizer: "standard",
                filter: [
                 "lowercase",
                 "englishStopWords"
                ]
               }
              }
            }
          },
          mappings: {
            properties: {
              productid: { type: 'integer' },
              upc: { type: 'keyword' },
              name: { type: 'text' },
              manufacturer: { type: 'keyword' },
              shortDescription: { type: 'keyword' },
              longDescription: { type: 'text' },
              Price: { type: 'integer' }
            }
          }
        }
      }, { ignore: [400] })
    console.log('created index products')
    let body = data.rows.flatMap(doc => [{ index: { _index: 'products' } }, doc])
    await client.bulk({ refresh: true, body })
    console.log("ingestion of data complete for index products")
    console.log("creating index autosuggest")
    await client.indices.create({
      index:'autosuggest',
      body:{
        settings: {
          analysis: {
          filter: {
          autocomplete_filter: {
          type: "edge_ngram",
          min_gram: 2,
          max_gram: 10
          }
          },
          analyzer: {
          autocomplete_analyzer: {
          type: "custom",
          tokenizer: "standard",
          filter: [ "lowercase", "autocomplete_filter"]
          }
          }
          }
          },
          mappings: {
            properties: {
              searchterm: { type: 'text', analyzer:'autocomplete_analyzer' }
            }
          }
      }
    })
    console.log("created index autosuggest")
      data = await pool.query("SELECT query as searchTerm FROM signals GROUP BY query ORDER BY COUNT(*) DESC")
      //data = await pool.query("SELECT name as searchTerm FROM products")
      body = data.rows.flatMap(doc => [{ index: { _index: 'autosuggest' } }, doc])
      await client.bulk({ refresh: true, body })
  console.log("ingestion of data complete for index autosuggest")
  console.log("creating index signals")

  data = await pool.query("SELECT * FROM Signals")
    await client.indices.create({
        index: 'signals',
        body: {
          mappings: {
            properties: {
              query: { type: 'text' },
              upc: { type: 'keyword' },
              boost: { type: 'integer' },
            }
          }
        }
      }, { ignore: [400] })
    console.log('created index signals')
    body = data.rows.flatMap(doc => [{ index: { _index: 'signals' } }, doc])
    await client.bulk({ refresh: true, body })
    console.log("ingestion of data complete for index signals")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = elasticingest