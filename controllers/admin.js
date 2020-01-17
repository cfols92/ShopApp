const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    const editMode = req.query.edit;
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: editMode
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(null, req.body.title, req.body.image, req.body.price, req.body.description);
    product.save();
    res.redirect('/');
};

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
        });
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        console.log('editMode = false, or does not exist in url')
        return res.redirect('/');
    }
    
    Product.findById(req.params.productId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            prods: product,
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode
        });
    });
};

exports.postEditProduct = (req,res,next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.image;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedImage,
        updatedPrice,
        updatedDescription);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req,res,next) => {
    Product.deleteById(req.body.productId);
    res.redirect('/admin/products');
};