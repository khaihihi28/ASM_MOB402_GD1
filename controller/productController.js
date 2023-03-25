const express = require('express')
const productModel = require('../models/products')
const app = express()


app.get('/home', async (req, res) => {
    const user = req.session.user;
    await productModel.find({}).then(product => {
        res.render('product/home_logined.handlebars', {
            product: product.map(product => product.toJSON()),
            email: user.email
        })
    })
})

app.get('/add', (req, res) => {
    res.render('product/add.handlebars');
})

// add
app.post('/add', async (req, res) => {
    if (req.body.id == '') {
        isAdd(req, res);
    }
    else {
        isEdit(req, res);
    }
    // const product = new productModel(req.body);
    // try {
    //     await product.save();
    //     res.redirect('/product/home')
    // } catch (err) {
    //     console.log(err)
    // }
})

const isAdd = async (req, res) => {
    const product = new productModel(req.body);
    try {
        await product.save();
        res.redirect('/product/home')
    } catch (err) {
        console.log(err)
    }
}

const isEdit = (req, res) => {
    productModel.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }).then((product) => {
        res.redirect('/product/home')
    }).catch((err) => {
        res.render('product/add.handlebars');
    })
    //     , (err, product) => {
    //     if (!err) {
    //         res.redirect('/product/home')
    //     }
    //     else {
    //         res.render('product/add.handlebars');
    //     }
    // })
}

//edit
app.get('/edit/:id', async (req, res) => {

    await productModel.findById(req.params.id).then(product => {
        res.render('product/add.handlebars', {
            product: product.toJSON(),
        })
    }).catch(err => {
        console.log(err);
    })
})

//delete
app.get('/delete/:id', async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id, req.body)
        if (!product) {
            console.log("k có product")
        }
        else {
            console.log('Deleted')
            res.redirect('/product/home')
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = app;
