
const express = require('express');
const fs = require('fs');
const app = express();

app.get('/api/countries',(req,res)=>{
 const data = JSON.parse(fs.readFileSync('../data/culture_dataset_120.json'));
 res.json(data);
});

app.listen(3000,()=>console.log("Server running on port 3000"));
