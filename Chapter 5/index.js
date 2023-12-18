//MVC Example
const express = reqiore("express");
const app = express();

//here calling from routes folder
const productRouter = require('./routes/productRouter');
app.use(express.json());
app.use('/products', productRouter.router) //here i am adding products and removing from routes folder


//CRUD operation REST APIs
//Create a poroduct using POST
// app.post('/products' , productController.createProduct);

// //READ a product using GET
// app.get('/products' , productController.showProducts);

// //READ a particular product using GET
// app.get('products/:id', productController.showOneProduct);

// //Update a particular product using PUT and PUT update the all data
// app.put('/products/:id', productController.updateProduct)

// //using PATCH this update the particular data
// app.patch('/products/:id', productController.updateProductByPatch)

// //DELETE 
// app.delete("/products/:id" , productController.deleteProduct)

app.listen(3030);