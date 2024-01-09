/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { addTodo } from '../../api/todos';

interface Props {
  userId: number;
}

export const TodoHeader: React.FC<Props> = ({ userId }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title) {
      addTodo({
        title: title.trim(),
        userId,
        completed: false,
      }, userId)
        .then(() => setTitle(''))
        .catch();
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={() => {}}
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
