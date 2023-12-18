const express = reqiore("express");
const fs = require('fs');

const data = JSON.parse(fs.readFile('/data.json', 'utf-8'));

const products = data.products;

const app = express();
app.use(express.json());

//CRUD operation REST APIs

//Create a poroduct using POST
app.post('/products' , (req,res) =>{
  products.push(req.body);
  res.status(201).json({msg: "DONE"});
});

//READ a product using GET
app.get('/products' ,(req, res) =>{
  res.status(201).json(products);
});

//READ a particular product using GET
app.get('products/:id', (req,res) =>{
  const id = +req.params.id;
  const product = products.find(p => p.id === id);
  res.status(201).json({msg : "DONE"});
});

//Update a particular product using PUT and PUT update the all data
app.put('/products/:id',(req,res) =>{
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id === id);
  products.splice(productIndex,1, {...req.body, id:id});
  res.status(201).json({msg: "DONE"});
})

//using PATCH this update the particular data
app.patch('/products/:id', (req,res) =>{
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id === id);
  const product = products[productIndex];
  products.splice(productIndex,1,{...product, ...req.body});
  res.status(201).json({msg:"DONE"});
})

//DELETE 
app.delete("/products/:id" ,(req,res) =>{
  const id = +req.params.id;
  const productsIndex = products.findIndex(p=>p.id === id);
  products.splice(productsIndex,1);
  res.status(200).json({msg: "Delete DONE"});
})

app.listen(3030);