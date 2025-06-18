import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Todo from "@components/Todo";
import Add from "@components/Add";
import { type todo } from "../../types";
import { getTodos } from "../../services";

const Dashboard = () => {
  const [todos, setTodos] = useState<todo[]>([]);
  const { data, error, isLoading } = useQuery<todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const [filterByNotDone, setFilterByNotDone] = useState(true);
  return (
    <>
      <h2>Dashboard</h2>
      {isLoading ? (
        error && <p>{error}</p>
      ) : (
        <ul>
          {data
            ?.filter(({ done }) => {
              if (filterByNotDone) {
                return !done;
              }
              return true;
            })
            .map(({ id, label, deadline, done, tags }: todo) => (
              <Todo
                key={id}
                id={id}
                label={label}
                tags={tags}
                deadline={deadline}
                done={done}
                setTodos={setTodos}
              />
            ))}
        </ul>
      )}
      <label htmlFor="displayAllTodos">Afficher toutes les todos</label>{" "}
      <input
        type="checkbox"
        name="displayAllTodos"
        id="displayAllTodos"
        checked={!filterByNotDone}
        onChange={() =>
          setFilterByNotDone((filterByNotDone) => !filterByNotDone)
        }
      />
      <Add setTodos={setTodos} />
    </>
  );
};

export default Dashboard;
