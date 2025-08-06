import React from 'react';
import classNames from 'classnames';

interface Props {
  allCompleted: boolean;
}

export const Header: React.FC<Props> = ({ allCompleted }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: allCompleted,
      })}
      data-cy="ToggleAllButton"
    />

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
