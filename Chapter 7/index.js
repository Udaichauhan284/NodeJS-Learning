//main item here

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const productRouter = require('./routes/productRouter');


//db connection
async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerc');
  console.log('database-connected');
}

//for error handling
main().catch(err => console.log(err));

//body parser
app.use(express.json());
app.use(morgan('default'));
app.use('/products', productRouter.router);

app.listen(3030, ()=>{
  console.log('server started')
})