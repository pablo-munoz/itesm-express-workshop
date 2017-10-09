// 2-templating-and-user-data/app.js
// This file is an exercise of the Express workshop
// given on the web developent class by the Tecnológico de Monterrey
// Campus Guadalajara on Aug 9, 2017 by Pablo Muñoz Haro.
//
// This exercises test some knowledge about the Express
// web framework including templating and processing submitted forms and
// url query parameters.

const path = require('path');
const express = require('express');
const app = express();

// There are many ways the user can send data to the application.
// Data can be sent as query params in the url, by submitting a form,
// or by sending a data interchange format like json using ajax.
// Therefore, we need to tell express how to handle the data it receives.
// the body-parser module includes some methods that install middleware
// on the application (we will talk about middleware later). This
// middleware does some preprocessing each time a request is made and
// mutate the request object right befour our app.get, app.post, etc.
// are called.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// We will now use the templating engine nunjucks, we will configure
// it in a way that when we call the response.render method, it in turn
// calls the templating logic.
const nunjucks = require('nunjucks');
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
});


// We will do an application that keeps track of things the user has
// to do. Here is the data
const todos = [
  {
    id: 0,
    name: 'Make my bed',
    status: 'done'
  },
  {
    id: 1,
    name: 'Go to university',
    status: 'done'
  },
  {
    id: 3,
    name: 'Have lunch',
    status: 'done'
  },
  {
    id: 4,
    name: 'Do homework',
    status: 'pending'
  },
  {
    id: 5,
    name: 'Learn express',
    status: 'pending'
  },
  {
    id: 6,
    name: 'Go home',
    status: 'pending'
  }
];

// On the home route, '/', we want to to display an ordere list containing
// the name of each todo, and optionally, a checkmark if that todo has
// a status equal to done. Rather than write the html ourselves
// like <ol><li>Make my bed</li><li>.... we will leverage the templating
// engine.
//
// In addition, the home route should display only the todos with a status
// of pending if the query param of filter is present, i.e. if the url
// is like localhost:3000?filter=pending
app.get('/', (request, response) => {
  console.log('A GET request came to the / url');
  console.log('The query params are: ', JSON.stringify(request.query, null, 2));

  // TODO: Make it so that if a 'filter' key is present in the request.query
  // object and if its value is equal to the string 'pending', then the
  // todos we send, responseTodos, are only those with a status equal to
  // 'pending'
  const responseTodos = todos;

  const context = {
    applicationName: 'TODO application',
    todos: responseTodos
  };

  // Don't forget to do the TODO items inside the views/index.html document
  // too.
  return response.render('index.html', context);
});

// On the /edit route we will handle two HTTP verbs, GET and POST. On a
// GET the user will receive a page with a form, where each item in
// the todos list has its own form. On a POST we will process the form
// body sent, and change the status of those todo items whose status
// changed and possibly add a new todo.

app.get('/edit', (request, response) => {
  console.log('A GET request came to the /edit url');

  const context = {
    applicationName: 'TODO editor',
    todos
  };

  return response.render('edit.html', context);
});

app.post('/edit', (request, response) => {
  console.log('A POST request came to the / url');
  console.log('The request body is: ', JSON.stringify(request.body, null, 2));

  // TODO: process each key in request.body.
  // If the key is the string 'newTodo', create a new object with
  // an id which is greater than any of the ids currently in the todos a date,
  // whose name property is the value and whose status is set to done.
  // If the key is a number it is the id of an existing todo item.
  // Find the item with the corresponding id in the todos array and update
  // its status to the string 'done'.

  const bodyKeys = Object.keys(request.body);
  bodyKeys.forEach( (key) => {
    if (key === 'newTodo') {
      // Create new todo and add it to the todos array
    } else if (!isNaN(Integer.parseInt(key))) {
      // Find the corresponding todo item by id and set its status
      // to the strin 'done'
    }
  });

  // Don't forget to do the TODO items inside the views/edit.html document
  // too.
  return response.redirect('/');
});

app.listen(3000);
