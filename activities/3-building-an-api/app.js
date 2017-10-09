// 3-api/app.js
// This file is an exercise of the Express workshop
// given on the web developent class by the Tecnológico de Monterrey
// Campus Guadalajara on Aug 9, 2017 by Pablo Muñoz Haro.
//
// This exercises test some knowledge about the Express
// web framework working with json, routing and middleware.

// We will now build upon our previous todos application and
// extend it so that it has an api, and therefore other
// it is possible to create, retrieve, update or delete items
// by using an api client that works with json.

const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// we will now tell express to also user the "json" body parsing
// strategy.
app.use(bodyParser.json());
// You don't need to worry about the two user data strategies colliding,
// as the body-parser module is smart enough to check the Content-Type
// of the rqeuest and use the appropiate one.

const nunjucks = require('nunjucks');
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
});

// We've separted the todos into their own module so that different files
// can access them.
const todos = require('./todos');

// It is now time to learn about middleware, middleware are functions
// that look just like the ones we've been writing as the second argument
// to our routes, but they have an extra parameter: next
//
// The middleware signature is:
// function(request, response, next) { ... }
//
// What the next function does when called is that it calls the next function in the
// chain, which could be other middleware or our own funciton(request, response) {}
// we write for the endpoint. The request and response object that each
// middleware and our functions see are the same, so a middleware could end
// a request prematurely by calling response.render, response.send, response.end
// or the like, and the remanining functions won't ever be called. In fact, this
// is a strategy used with authencation, for each sensitive route we would
// add a middelware that checks credentials, and if they aren't valid, ends
// the request right then and there.
//
// Lets write a toy middleware for didactic purposes, we will apply
// this middleware to all routes.
app.use((request, response, next) => {
  console.log('The toy middleware was called');
  request.greeting = 'Hello, world!';
  console.log('The toy middleware added a \'greeting\' attribute to the request obj.');
  console.log('The toy middleware is going to pass control to the next function.');
  next();
});

// The express object has the special Router object, (express.Router)
// that allows us to define .get, .post, .put, etc handlers for different
// paths. The router is in fact a middleware, so we can then install it
// on our application on a specific path. The path where the router
// middelware was installed are concatenated. This allows us to
// separate the logic of our routes into different files and install
// them on the main application.
const routes = require('./api-routes');

app.use('/api', routes);

// Now if you were to go and modify the app.get and app.post we wrote before
// to log to the console the value of requets.greeting you wild find the
// string that was introduced by the toy middleware.

// TODO Copy and paste your routes from exercise 2 here, that is, your code
// for app.get('/',...   app.get('/edit,...   and app.post('/edit,

app.listen(3000);
