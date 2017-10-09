// We've separted the todos into their own module so that different files
// can access them.

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
    id: 2,
    name: 'Have lunch',
    status: 'done'
  },
  {
    id: 3,
    name: 'Do homework',
    status: 'pending'
  },
  {
    id: 4,
    name: 'Learn express',
    status: 'pending'
  },
  {
    id: 5,
    name: 'Go home',
    status: 'pending'
  }
];

module.exports = todos;
