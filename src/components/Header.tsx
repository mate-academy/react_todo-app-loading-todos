import React from 'react';

interface Props {
  todosCount: number;
  isAllCompleted: boolean;
}

export const Header: React.FC<Props> = ({ todosCount, isAllCompleted }) => {
  return (
    <header className="todoapp__header">
      {todosCount > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
        />
      )}

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
