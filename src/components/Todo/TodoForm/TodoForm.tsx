import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { addTodo, USER_ID } from '../../../api/todos';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todo = {
      title,
      userId: USER_ID,
      completed: false,
    };

    await addTodo(todo);
  };

  const handleChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      if (titleError) {
        setTitleError(false);
      }
    },
    [titleError],
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        onChange={handleChangeTitle}
      />
    </form>
  );
};
