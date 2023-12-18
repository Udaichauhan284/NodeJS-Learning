const express = require('express');

const productController = require('../controller/products')

const router = express.Router();

router.post('/' , productController.createProduct)
.get('/' , productController.showProducts)
.get('/:id', productController.showOneProduct)
.put('/:id', productController.updateProduct)
.patch('/:id', productController.updateProductByPatch)
.delete("/:id" , productController.deleteProduct)

exports.router = router;