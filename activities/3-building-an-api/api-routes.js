const express = require('express');
const router = express.Router();

const todos = require('./todos');

router.get('/', (request, response) => {
  response.json(todos);
});

router.post('/', (request, response) => {
  const biggestIdSoFar = todos[todos.length - 1].id;
  const nextId = biggestIdSoFar + 1;

  // TODO. Create a new todo item with id equal to nextId,
  // name equal to the 'name' attribute of the request body
  // and a status of pending, then add it to the todos array
  // and respond with the json of the newly created item.
  response.end();
});

router.get('/:id', (request, response) => {
  const id = Number.parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).send(`${id} is not a valid todo id`);
  }

  todos.forEach((item) => {
    if (item.id === id) {
      return response.json(item);
    }
  });
});

router.patch('/:id', (request, response) => {
  const id = Number.parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).send(`${id} is not a valid todo id`);
  }

  todos.forEach((item) => {
    // TODO, find the item with the id given as a url param, and
    // modify its name attribute to be equal to the 'name' property
    // of the request body. Respond with the json of the modified item.
  });

  response.end();
});

router.delete('/:id', (request, response) => {
  const id = Number.parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).send(`${id} is not a valid todo id`);
  }

  todos.forEach((item, index) => {
    if (item.id === id) {
      todos.splice(index, 1);
      return response.status(204).end();
    }
  });

  return response.status(400).send(`${id} is not a valid todo id`);
});

module.exports = router;
