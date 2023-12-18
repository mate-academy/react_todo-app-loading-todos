import React from 'react';

export const TodoHeader: React.FC = () => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
