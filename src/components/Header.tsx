import React from 'react';

type Props = {
  todosLength: number;
  allCompleted: boolean;
};

export const Header: React.FC<Props> = ({ todosLength, allCompleted }) => (
  <header className="todoapp__header">
    {todosLength > 0 && (
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
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