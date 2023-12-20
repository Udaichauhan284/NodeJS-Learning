const fs = require('fs');
const model = require('../model/productModel');
const mongoose = require('mongoose');
const Product = model.Product;


exports.createProduct = (req,res) =>{
  const product = new Product(req.body);
  product.save((err,doc)=>{
    console.log({err, doc});
    if(err){
      res.status(400).json(err);
    }else{
      res.status(201).json(doc);
    }
  })
}

exports.showProducts = async(req,res) =>{
  const products = await Product.find({price:{$gt:500}});
  res.json(products);
}

exports.showOneProduct = async (req,res) =>{
  const id = +req.params.id;
  const product = await Product.findById(id);
  res.json(product);
}

exports.updateProduct = async (req, res) =>{
 const id = +req.params.id;
 try{
  const doc = await Product.findOneAndReplace({_id:id}, req.body,{new:true})
  res.status(201).json(doc);
 }catch(err){
  console.log(err);
  res.status(400).json(err);
 }
}

exports.updateProductByPatch = async(req, res) =>{
  const id = +req.params.id;
  try{
    const doc = await Product.findOneAndUpdate({_id:id},req.body,{new:true});
    res.status(201).json(doc);
  }catch(err){
    console.log(err);
    res.status(400).json(err);
  }
}

exports.deleteProduct = async(req, res) =>{
  const id = +req.params.id;
  try{
    const doc = await Product.findOneAndDelete({_id:id});
    res.status(201).json(doc);
  }catch(err){
    console.log(err);
    res.status.json(err);
  }
}