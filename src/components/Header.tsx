import classNames from 'classnames';
import React from 'react';

type Props = {
  areAllCompleted: boolean;
};

export const Header: React.FC<Props> = ({ areAllCompleted }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: areAllCompleted,
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
