const mongoose = require('mongoose')
const productsShema = new mongoose.Schema({
    name: {
        type: 'string',
        require: true,
    },
    price: {
        type: 'string',
        require: true,
    },
    img: {
        type: 'string',
    },
    color: {
        type: 'string',
    },
    loai: {
        type: 'string',
        require: true,
    },
})
const products = mongoose.model('products', productsShema);
module.exports = products;