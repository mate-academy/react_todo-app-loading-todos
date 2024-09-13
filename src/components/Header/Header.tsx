import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { USER_ID } from '../../api/todos';

type Props = {
  addTodo: (newTodo: Todo) => void;
};

export const Header: React.FC<Props> = ({ addTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo({
      id: 0,
      userId: USER_ID,
      title: title.trim(),
      completed: false,
    });
    setTitle('');
  };
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
        />
      </form>
    </header>
  );
};
