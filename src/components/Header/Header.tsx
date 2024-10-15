import cn from 'classnames';
import React from 'react';

interface Props {
  unfinishedTodoAmount: number;
  todosLength: number;
}

export const Header: React.FC<Props> = ({
  todosLength,
  unfinishedTodoAmount,
}) => {
  const areAllTodoCompleted = unfinishedTodoAmount === 0;

  return (
    <header className="todoapp__header">
      {!!todosLength && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: areAllTodoCompleted,
          })}
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
