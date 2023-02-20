import React from 'react';
import classNames from 'classnames';

type Props = {
  activeTodos: number;
};

export const Header: React.FC<Props> = ({ activeTodos }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: activeTodos === 0,
      })}
      aria-label="Toggle all todos"
    />

    {/* Add a todo on form submit */}
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
