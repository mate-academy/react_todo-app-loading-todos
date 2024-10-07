import classNames from 'classnames';
import React from 'react';

type Props = {
  areAllTodosCompleted: boolean;
};

export const Header: React.FC<Props> = ({ areAllTodosCompleted }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: areAllTodosCompleted,
      })}
      data-cy="ToggleAllButton"
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
