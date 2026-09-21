import React from 'react';
import classNames from 'classnames';

interface Props {
  todosCount: number;
  activeTodosCount: number;
}

export const Header: React.FC<Props> = ({ todosCount, activeTodosCount }) => {
  const isAllCompleted = todosCount > 0 && activeTodosCount === 0;

  return (
    <header className="todoapp__header">
      {todosCount > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={e => e.preventDefault()}>
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
