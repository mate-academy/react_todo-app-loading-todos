import React from 'react';

interface Props {
  areTodosPresent: boolean;
}

export const TodoHeader: React.FC<Props> = ({ areTodosPresent }) => (
  <header className="todoapp__header">
    {areTodosPresent && (
      <button
        type="button"
        className="todoapp__toggle-all active"
        aria-label="Show todos"
      />
    )}

    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
