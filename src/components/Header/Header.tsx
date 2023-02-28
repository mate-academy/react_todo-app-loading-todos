import React from 'react';
import classNames from 'classnames';

type Props = {
  counterActiveTodos: number;
};

export const Header: React.FC<Props> = React.memo(({ counterActiveTodos }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: counterActiveTodos === 0,
        })}
        aria-label="Toggle all todos"
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
});
