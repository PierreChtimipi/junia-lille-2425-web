import { type Dispatch, type SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type todo } from '../../types';
import style from "./todo.module.scss";

const Todo = ({ id, label, tags, deadline, done, setTodos }: todo & { setTodos: Dispatch<SetStateAction<todo[]>> }) => {
  let deadlineDisplay = "Pas de date";
  if (deadline) {
    const date = new Date(deadline);
    if (!isNaN(date.getTime())) {
      deadlineDisplay = date.toLocaleDateString();
    }
  }
  return (
    <li className={style.todo} aria-label={`todo : ${label}`}>
      <input type="checkbox" name="done" checked={done} className={style.check} onChange={() => setTodos((todos: todo[]) => todos.map((todo: todo) => {
        const copyTodo = structuredClone(todo);
        if (id === copyTodo.id) {
          copyTodo.done = !copyTodo.done;
        }
        return copyTodo
      }))} />
      <div className="info">
        <h3 className={style.title}>{label}</h3>
        <div className={style.meta}>
          <ul className={style.tags}>
            {tags.map((tag) => <li key={uuidv4()} className={style.tag}>#{tag}</li>)}
          </ul>
          <span className={style.date}>{deadlineDisplay}</span>
        </div>
      </div>
    </li>
  )
}

export default Todo;