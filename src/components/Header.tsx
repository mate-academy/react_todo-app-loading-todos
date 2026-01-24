/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface Props {
  allCompleted: boolean;
  todosCount: number;
  isLoading: boolean;
}

export const Header: React.FC<Props> = ({
  allCompleted,
  todosCount,
  isLoading,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={
          allCompleted ? 'todoapp__toggle-all active' : 'todoapp__toggle-all'
        }
        data-cy="ToggleAllButton"
        disabled={todosCount === 0}
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          disabled={isLoading}
        />
      </form>
    </header>
  );
};
