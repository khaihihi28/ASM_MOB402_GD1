const express = require('express')
const bodyParser = require("body-parser");
const session = require("express-session");
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const connectDB = require('./config/db')
// const productRouter = require('./routes/productRouter')
const productController = require('./controller/productController')


const app = express()



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());
// connect to database
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "secret-key", resave: false, saveUninitialized: true }))

//cấu hình pug, handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// app.set('view engine', 'pug');
app.set('views', './views')

let users = [];
let products = [{ id: 1, name: 'Áo gucci', price: '100$', }];

app.get("/", (req, res) => {
    const user = req.session.user;
    if (user) {
        console.log(user)
        res.render('product/home_logined', { email: user.email })
        res.redirect("/product/home");

        console.log("đã login")
    } else {
        res.redirect("/home");
    }
});

app.get('/home', (req, res) => {
    res.render('home')
});

//dang ký
app.get("/register", (req, res) => {
    res.render('register');
});

//Xử lý đăng ký

app.post("/register", (req, res) => {
    const user = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        avatar: req.body.avatar,
        avatar_img: req.body.avatar_img
    };
    users.push(user);
    console.log(user)
    res.redirect("/login");
});

// đăng nhập
app.get("/login", (req, res) => {
    res.render('login');
});

//Xử lý đăng nhập
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = users.find((user) => {
        return user.email === email && user.password === password;
    });

    if (user) {
        req.session.user = user;
        const emai = user.email;
        console.log(email)
        res.redirect("/");
    } else {
        res.send("Đăng nhập thất bại.");
    }
});

// Đăng xuất
app.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/home");
});

//add
app.use(('/product'), productController)


const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//áo khoác 2 màu : https://tse1.mm.bing.net/th?id=OIP.vbTyCq_Mx5feJeHpvQljcAHaFj&pid=Api&P=0
//Áo phông : https://tse4.mm.bing.net/th?id=OIP.If005AMTYeoY9uuGqi22tgHaIx&pid=Api&P=0
// Quần sooc : https://bizweb.dktcdn.net/100/386/444/products/quan-short-gucci-gg-logo-stripe-houndstooth-chuan-authentic-4.jpg?v=1588924390767
//QUần jean: http://media.bizwebmedia.net/sites/127046/data/images/2018/9/4710059quan_gucci_tapered_denim_with_web_detail_chuan_authentic.jpg