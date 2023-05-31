import { FormEvent, useCallback } from 'react';
import { Todo } from '../../types/Todo';
import { client } from '../../utils/fetchClient';

interface PropsNewTodo {
  value: string,
  setValue(val: string): void;
}
export const NewTodo = ({ value, setValue }: PropsNewTodo) => {
  const USER_ID = 10529;
  const url = `/todos?userId=${USER_ID}`;

  const createNewTodo = useCallback((event: FormEvent) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: 0,
      title: value,
      userId: USER_ID,
      completed: false,
    };

    client.post(url, newTodo).then(() => {
      setValue('');
    }).catch(() => Error('Unable to add a todo'));
  }, []);

  return (
    <form
      onSubmit={createNewTodo}
    >
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
};
