const express = require('express');
const bodyParser = require('body-parser');

const { resolve } = require('path'); 

const {
  readFileSync,
  writeFileSync
} = require('fs');

const todoListPath = resolve(__dirname, './todoList.json');

const app = express();

// 用于解析 post 参数 a=1&b=2 -> {a: 1, b: 2}
app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());

app.get('/get_todoList', (req, res) => {
  const todoData = JSON.parse(readFileSync(todoListPath, 'utf-8'));

  res.send({
    error_code: 0,
    error_msg: 'ok',
    data: todoData
  })
});

app.post('/add_todo', (req, res) => {
  const todo = req.body.todo;
  let todoData = JSON.parse(readFileSync(todoListPath, 'utf-8'));

  todoData.push(todo);
  writeFileSync(todoListPath, JSON.stringify(todoData));

  res.send({
    error_code: 0,
    error_msg: 'ok',
    data: null
  });
});

app.post('/toggle_todo', (req, res) => {
  const id = req.body.id;
  let todoData = JSON.parse(readFileSync(todoListPath, 'utf-8'));

  todoData = todoData.map(todo => {
    todo.id === id && (todo.completed = !todo.completed);
    return todo;
  });

  writeFileSync(todoListPath, JSON.stringify(todoData));

  res.send({
    error_code: 0,
    error_msg: 'ok',
    data: null
  })
});

app.post('/remove_todo', (req, res) => {
  const id = req.body.id;
  let todoData = JSON.parse(readFileSync(todoListPath, 'utf8'));

  todoData = todoData.filter(todo => todo.id !== id);
  writeFileSync(todoListPath, JSON.stringify(todoData));

  res.send({
    error_code: 0,
    error_msg: 'ok',
    data: null
  });
});


app.listen(3000, function () {
  console.log('welocome on port 3000');
})