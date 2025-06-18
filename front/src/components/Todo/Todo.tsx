import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { type todo } from "../../types";
import style from "./todo.module.scss";
import { updateTodo } from "../../services/api";

const Todo = ({ id, label, tags, deadline, done }: todo) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<{ done: boolean }, unknown, { done: boolean }>({
    mutationFn: (updates) => updateTodo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Sécurisation de l'affichage de la date
  let dateStr = "Pas de date";
  if (deadline) {
    const dateObj = new Date(deadline);
    if (!isNaN(dateObj.getTime())) {
      dateStr = new Intl.DateTimeFormat("fr-FR", { dateStyle: "full" }).format(
        dateObj
      );
    }
  }

  return (
    <li className={style.todo} aria-label={`todo : ${label}`}>
      <input
        type="checkbox"
        name="done"
        aria-label={`check ${label}`}
        checked={done}
        className={style.check}
        onChange={() => mutation.mutate({ done: !done })}
      />
      <div className="info">
        <h3 className={style.title}>{label}</h3>
        <div className={style.meta}>
          <ul className={style.tags}>
            {(tags || []).map((tag) => (
              <li key={uuidv4()} className={style.tag}>
                #{tag}
              </li>
            ))}
          </ul>
          <span className={style.date}>{dateStr}</span>
        </div>
      </div>
    </li>
  );
};

export default Todo;
