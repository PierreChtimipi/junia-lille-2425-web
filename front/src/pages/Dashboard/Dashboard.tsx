import { useState } from "react";
import Todo from "@components/Todo";
import Add from "@components/Add";
import { type todo } from "../../types";

import { useEffect } from "react";

const Dashboard = () => {
  const [todos, setTodos] = useState<todo[]>([]);
  const [filterByNotDone, setFilterByNotDone] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json();
        setTodos(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    fetchTodos();
  }, []);

  

  return <>
    <h2>Dashboard</h2>
    <label htmlFor="displayAllTodos">Afficher toutes les todos</label> <input type="checkbox" name="displayAllTodos" id="displayAllTodos" checked={!filterByNotDone} onChange={() => setFilterByNotDone(filterByNotDone => !filterByNotDone)} />
    <ul>
      {
        todos
          .filter(({ done }) => {
            if (filterByNotDone) {
              return !done
            }
            return true
          })
          .map(({ id, label, deadline, done, tags }: todo) =>
            <Todo key={id} id={id} label={label} tags={tags} deadline={deadline} done={done} setTodos={setTodos} />)
      }
    </ul>
    <Add setTodos={setTodos} />
  </>
}

export default Dashboard;