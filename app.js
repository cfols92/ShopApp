const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));

app.use("/admin", adminData.routes);

app.use(shopRoutes);

app.use((req,res,next) => {
    res.status(404).render('404',{docTitle: '404 Page Not Found',path: ''})
})

app.listen(3000);