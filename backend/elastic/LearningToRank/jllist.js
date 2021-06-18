const client = require('./elastic');
const csv = require('csvtojson')
const csvFilePath = './jllist.csv'
const converter = require('json-2-csv');

const createDataset = async (jl) => {
  let dataset = []
  for (const row of jl) {
    try{
      await client.search({
          index:'products',
          body:{
            query: {
                bool: {
                  filter: [
                    {
                      terms: {
                        "upc": [
                          row.target
                        ]
                      }
                    },
                    {
                      sltr: {
                        "_name": "logged_featureset",
                        "featureset": "product_features",
                        "params": {
                          "keywords": row.query
                        }
                      }
                    }
                  ]
                }
              },
              "ext": {
                "ltr_log": {
                  "log_specs": {
                    "name": "log_entry1",
                    "named_query": "logged_featureset",
                "missing_as_zero":true
                  }
                }
              }
          }
      }).then(res => {return res.body.hits}).then(res=>{
          const data = res.hits[0].fields._ltrlog[0].log_entry1
          let x = ''
          x += row.type + " "
          x += row.qid+" "
          data.forEach(item => {
              x+=`${item.name}:${item.value} `
          });
          x += "# "+row.target+" "
          x+=row.query
          dataset.push({val:x})
      })
  }
  catch(err){
  }
  }
  console.log(dataset.length)
  return dataset
}
const js = async () => {
  let dataset = []
  const res = await csv().fromFile(csvFilePath)
  console.log(res.length)
  var fs = require('fs');
  for (let i = 0;  i< res.length; i=i+1000) {
    let tdata=await createDataset(res.slice(i,i+1000))
    dataset.push(...tdata)   
  }
  converter.json2csv(dataset, (err, cv) => {
    if (err) {
        throw err;
    }
    // write CSV to a file
    fs.writeFileSync('xgboost', cv);
    
});  
}
js()
