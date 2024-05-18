import express, { request, response } from 'express';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
 
// Structure User
const User = [
  { id: 1, name: 'Dimon', email: 'kitty.house@example.com', age: 14 },
  { id: 2, name: 'Amanda', email: 'amanda.pink@example.com', age: 12 },
  { id: 3, name: 'Katrin', email: 'katrin.sun@example.com', age: 18 },
  { id: 4, name: 'Emmi', email: 'kitty.mimi@example.com', age: 20}
];

// Access points
app.get('/', (req, res) => {                        // '/'
  res.send('Hello from Node.js server!');
});
app.get('/user', (req, res) => {                    // '/user'
  res.json(User); 
});
app.get('/users/:id', (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parseId = parseInt(id);
  if (isNaN(parseId)) return response.sendStatus(400);
  const findUserIndex = User.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return response.sendStatus(404);
  return response.json(User[findUserIndex]);
});

 // Create new user
app.post("/api/users", (request, response) => {
  const { body } = request;
  const nextId = User.length > 0 ? User[User.length - 1].id + 1 : 1;
  const newUser = { id: nextId, ...body };
  User.push(newUser);
  return response.status(201).send(newUser);
});

//Update user
app.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parseId = parseInt(id);
  if (isNaN(parseId)) return response.sendStatus(400);
  const findUserIndex = User.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return response.sendStatus(404);
  User[findUserIndex] = {id: parseId, ...body };
  return response.sendStatus(200);
});


//Delete user
app.delete("/api/users/:id", (request, response) => {
  const {
    params: { id },
  } = request;
  const parseId = parseInt(id);
  if (isNaN(parseId)) return response.sendStatus(400);
  const findUserIndex = User.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return response.sendStatus(404);
  User.splice(findUserIndex, 1);
  return response.sendStatus(200);
});


// Starting the server
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});