import React from 'react';

type Props = {
  hasTodos: boolean;
  allCompleted: boolean;
};

export const TodoHeader: React.FC<Props> = ({ hasTodos, allCompleted }) => (
  <header className="todoapp__header">
    {hasTodos && (
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        aria-label="Toggle all todos"
      />
    )}

    <form onSubmit={event => event.preventDefault()}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        aria-label="New todo"
      />
    </form>
  </header>
);
