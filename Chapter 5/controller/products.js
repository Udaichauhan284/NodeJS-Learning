const fs = require('fs');
const data = JSON.parse(fs.readFile('/data.json', 'utf-8'));
const products = data.products;

exports.createProduct = (req,res) =>{
  products.push(req.body);
  res.status(201).json({msg: "DONE"});
}

exports.showProducts = (req,res) =>{
  res.status(201).json(products);
}

exports.showOneProduct = (req,res) =>{
  const id = +req.params.id;
  const product = products.find(p => p.id === id);
  res.status(201).json({msg : "DONE"});
}

exports.updateProduct = (req, res) =>{
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id === id);
  products.splice(productIndex,1, {...req.body, id:id});
  res.status(201).json({msg: "DONE"});
}

exports.updateProductByPatch = (req, res) =>{
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id === id);
  const product = products[productIndex];
  products.splice(productIndex,1,{...product, ...req.body});
  res.status(201).json({msg:"DONE"});
}

exports.deleteProduct = (req, res) =>{
  const id = +req.params.id;
  const productsIndex = products.findIndex(p=>p.id === id);
  products.splice(productsIndex,1);
  res.status(200).json({msg: "Delete DONE"});
}