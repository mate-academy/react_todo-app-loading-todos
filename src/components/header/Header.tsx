import React from 'react';
import cn from 'classnames';

type Props = {
  isAllCompleted: boolean;
  toDosCount: number;
};

export const Header: React.FC<Props> = ({ isAllCompleted, toDosCount }) => {
  return (
    <header className="todoapp__header">
      {toDosCount > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: isAllCompleted })}
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
