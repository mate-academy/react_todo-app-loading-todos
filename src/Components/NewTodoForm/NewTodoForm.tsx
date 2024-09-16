import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { USER_ID } from '../../api/todos';

type Props = {
  onSubmit: (todo: Omit<Todo, 'id'>) => Promise<void>;
};

export const NewTodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      title: todoTitle,
      userId: USER_ID,
      completed: false,
    }).then(() => setTodoTitle(''));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={event => setTodoTitle(event.target.value)}
        autoFocus
      />
    </form>
  );
};
