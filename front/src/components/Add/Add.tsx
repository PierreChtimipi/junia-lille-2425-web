import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Dispatch, type FormEvent, type SetStateAction } from "react";

import { addTodo } from '../../services/api';
import { type todo } from "../../types";

const Add = ({ setTodos }: { setTodos: Dispatch<SetStateAction<todo[]>> }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    console.log(form.get("deadline"));

    setTodos(todos => ([
      ...todos,
      {
        id: todos.length + 1,
        label: form.get("label") as string,
        tags: (form.get("tags") as string).split(','),
        deadline: new Date(form.get("deadline") as string),
        done: false
      }
    ]))

    mutation.mutate({
      label: form.get('label'),
      tags: (form.get('tags') as string).split(','),
      deadline: form.get('deadline'),
      done: false
    });
    // e.currentTarget.reset();
  }
  return <>
    <h2>
      Ajouter
    </h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="label">Libellé</label>
      <input type="text" name="label" id="label" placeholder="Libellé de ma tâche" />
      <label htmlFor="tags">Tags</label>
      <input type="text" name="tags" id="tags" placeholder="tag1,tag2,tag3" />
      <label htmlFor="deadline">Echéance</label>
      <input type="date" name="deadline" id="deadline" />
      <button type="submit">Ajouter</button>
    </form>
  </>
}

export default Add;