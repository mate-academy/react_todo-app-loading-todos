import { useState } from 'react';
import { Todo } from '../../types/Todo';

export const USER_ID = import.meta.env.VITE_USER_ID;

type Props = {
  newTodo: (todo: Todo) => void;
};

export const NewTodo: React.FC<Props> = ({ newTodo }) => {
  const [value, setValue] = useState('');

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const normalizeValue = event.target.value.trim();

    setValue(normalizeValue);
  };

  const formHandler = (event: React.FormEvent) => {
    event.preventDefault();

    newTodo({
      id: 0,
      completed: false,
      title: value,
      userId: USER_ID,
    });

    setValue('');
  };

  return (
    <form onSubmit={formHandler}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={inputHandler}
      />
    </form>
  );
};
