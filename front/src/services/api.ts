export const getTodos = () =>
  fetch("http://localhost:3000/todos").then(async (res) => await res.json());

export async function addTodo(todo: any) {
  const response = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error("Erreur lors de l'ajout");
  return response.json();
}

export async function updateTodo(id, updates) {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Erreur lors de la mise à jour");
  return response.json();
}
