const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, "data.json");

// Fonction pour lire les tâches depuis data.json
function readTodos() {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
}

// Fonction pour écrire les tâches dans data.json
function writeTodos(todos) {
  fs.writeFileSync(dataFilePath, JSON.stringify(todos, null, 2), "utf-8");
}

// Route pour récupérer les todos
app.get("/todos", (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route pour modifier l'état d'une tâche
app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  const todos = readTodos();
  const todo = todos.find((t) => t.id === parseInt(id, 10));
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.done = done;
  writeTodos(todos);
  res.json(todo);
});

// Route pour ajouter une nouvelle tâche
app.post("/todos", (req, res) => {
  const { label, tags, deadline } = req.body;

  if (!label || !tags || !deadline) {
    return res
      .status(400)
      .json({ error: "Missing required fields: label, tags, deadline" });
  }

  const todos = readTodos();
  const newTodo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    label,
    tags,
    deadline,
    done: false,
  };

  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});