import { http, HttpResponse } from "msw";

let todos = [{ id: 1, label: "Mock todo", done: false }];

export const handlers = [
  // GET todos
  http.get("http://localhost:3000/todos", () => {
    return HttpResponse.json(todos);
  }),

  // POST add todo
  http.post("http://localhost:3000/todos", async ({ request }) => {
    const body = await request.json();
    const newTodo = { ...body, id: Date.now() };
    todos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  // PATCH update todo
  http.patch("http://localhost:3000/todos/:id", async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    todos = todos.map((todo) => (todo.id == id ? { ...todo, ...body } : todo));
    const updated = todos.find((todo) => todo.id == id);
    return HttpResponse.json(updated);
  }),
];
