import cn from 'classnames';
import React from 'react';

type Props = {
  allTodosAreActive: boolean;
};

export const Header: React.FC<Props> = ({ allTodosAreActive }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={cn('todoapp__toggle-all', { active: allTodosAreActive })}
      data-cy="ToggleAllButton"
    />

    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  </header>
);
