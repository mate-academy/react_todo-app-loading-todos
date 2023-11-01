/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { addTodo } from '../../api/todos';

type Props = {
  userId: number;
};

export const TodoHeader: React.FC<Props> = ({ userId }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title) {
      addTodo({
        title,
        completed: false,
        userId,
      }, userId)
        .then(() => setTitle(''))
        .catch();
    }
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={() => { }}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
