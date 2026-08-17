import React from 'react';

type Props = {
  completedAllTodos: () => void;
  allCompleted: boolean;
};

export const Header: React.FC<Props> = ({
  completedAllTodos,
  allCompleted,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={completedAllTodos}
      />

      {/* Add a todo on form submit */}
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
