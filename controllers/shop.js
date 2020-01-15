const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getCart = (req,res,next) => {
  // import from file that contains everything that has been "added to cart"
  res.render('shop/cart',{
    pageTitle: 'Your Cart',
    path: '/cart'
  });
};

exports.getIndex = (req,res,next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/'
    });
  });
};

exports.getCheckout = (req,res,next) => {
  res.render('shop/checkout',{
    pageTitle: 'Checkout',
    path: '/checkout'
  })
};

exports.getOrders = (req,res,next) => {
  res.render('shop/orders',{
    pageTitle: 'Orders',
    path: '/orders'
  })
}

exports.getProduct = (req,res,next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    // console.log(product);
    res.render('shop/product-detail',{
      prods: product,
      pageTitle: 'Details',
      path: '/details'
    })
  });
}