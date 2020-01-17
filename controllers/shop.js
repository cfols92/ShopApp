const Product = require('../models/product');
const Cart = require('../models/cart');

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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        console.log('product id: ' + product.id)
        
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData){
          cartProducts.push({
            productData:product,
            qty: cartProductData.qty
          });
        }
      }
      res.render('shop/cart',{
        products: cartProducts,
        pageTitle: 'Your Cart',
        path: '/cart'
      });
    });
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
      path: '/products'
    })
  });
}

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    console.log('postCart controller logs product id here: ' + prodId);
    Cart.addPoduct(prodId,product.price);
    res.redirect('/cart');
  })
}

exports.postCartDeleteItem = (req,res,next) => {
  Product.findById(req.body.productId, product => {
    Cart.deleteProduct(product.id, product.price);
    res.redirect('/cart');
  });
}