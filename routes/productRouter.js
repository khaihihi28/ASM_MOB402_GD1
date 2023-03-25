const express = require('express')
const productModel = require('../models/products')
const app = express();

// add
app.post('/addProduct', async (req, res) => {
    const product = new productModel(req.body);
    try {
        await product.save();
        res.send(product);
    } catch (err) {
        console.log(err)
    }
})

//Lấy all
app.get('/list', async (req, res) => {
    const product = await productModel.find({});
    try {
        res.send(product);
    } catch (err) {
        console.log(err)
    }
})

// update
app.patch('/update/:id', async (req, res) => {
    try {
        const productsModel = await productModel.findByIdAndUpdate(req.params.id, req.body)
        await productsModel.save();
        res.send(productsModel);
    } catch (err) {
        console.log(err)
    }
})

//delete
app.delete('/update/:id', async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id, req.body)
        if (!product) {
            console.log("k có product")
        }
        else {
            console.log('Deleted')
        }
    } catch (err) {
        console.log(err)
    }
})
module.exports = app;