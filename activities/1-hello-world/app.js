// 1-hello-world/app.js
// This file is the starting exercise of the Express workshop
// given on the web developent class by the Tecnológico de Monterrey
// Campus Guadalajara on Aug 9, 2017 by Pablo Muñoz Haro.
//
// This exercises test some basic knowledge about the Express
// web framework including sending respones, and obtaining
// parameters from the url.

const express = require('express');
const app = express();

// The app object exposes the get, post, put, delete, patch...
// and many other methods that match an HTTP verb. Each
// of these functions has the same signature:
//
// app.[method](path-that-will-trigger-logic, callback-that-handles-logic)
//
// In turn, the "callback-that-triggers-logic" will the signature:
// function(req, res)
//
// Where the "req" object exposes methods that allow you to retrieve
// information of the HTTP request that was made, while the "res"
// object gives you ways to send information back to the user.

// Example route. When a GET is sent to the website's home, i.e.
// the / path, it will return the stirng "Hello, world!", this
// is done by invoking the res.send method
app.get('/', (request, response) => {
  response.send("Hello, world!");
});


// One example of how the req object of the callback allows us to
// retrieve information of the HTTP request is to extract parts
// of the url path. This is often done for things like
// a product page, where the path is the string "product" followed
// by a forward slash / and then the product id. The backend
// would use this product id to fetch information about a particular
// product from a datastore and send it to the user. To make it
// so that a part of the path can be extracted you must prefix it with
// a colon, ':', and you will be able to retrieve it from
// request.params.[url-part-prefixed-with-colon]
const mockProductDataStore = {
  '123': {
    title: 'A magnificent product',
    price: 99.99,
    rating: 5
  },
  '456': {
    title: 'An ok product',
    price: 49.99,
    rating: 3.5
  },
  '789': {
    title: 'A terrible product',
    price: 29.99,
    rating: 1.5
  }
};

app.get('/product/:productId', (request, response) => {
  const productId = request.params.productId;
  const productData = mockProductDataStore[productId];

  if (productData === undefined) {
    return response.send('Sorry, we don\'t have that product.');
  }

  return response.send(`
<html>
  <head></head>
  <body>
    <h1>${productData.title}</h1>
    <p>${productData.price}</p>
    <p>${productData.rating}</p>
  </body>
</html>
    `)
});


// Web frameworks are great because they allow us to preprocess the
// HTML (or whatever format of response we are sending) for EACH request.
// This makes it possible to make non-deterministic pages, where
// the same url may give out different results for different users,
// devices, date times, etc.
app.get('/random', (request, response) => {
  const randomNumber = Math.ceil(Math.random() * 100);
  return response.send(`Here is a random number (1-100): ${randomNumber}`);
});


// TODO: Implement logic so that the application responds
// on the path /about with a string that tells something about you.
app.get('/about', (request, response) => {
  return response.end();
});


// TODO: Implement logic so that the application responds
// on the path /greetme/:name with a string that gives a friendly
// greeting to the name that is given as the variable part of the
// path.
app.get('/greetme/:name', (request, response) => {
  return response.end();
});

// TODO: Implement logic so that the application responds
// on the path /datetime with the current date and time.
// HINT: In NodeJS you can create a new 'Date' object with
// the current date and time values by executing:
//
// const date = new Date();
//
// date objects have many methods, you may be interested in
// the methods date.toTimeString and date.toDateString
app.get('/datetime', (request, response) => {
  return response.end();
});

// We must put our app object to listen on a specific port for it to work!
// This will start a long-running process. We may kill this process by
// typing Control-c on our terminal.
app.listen(3000);
