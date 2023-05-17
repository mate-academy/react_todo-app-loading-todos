import classNames from 'classnames';
import React from 'react';

type Props = {
  countActiveTodos: number;
};

export const Header: React.FC<Props> = React.memo(({ countActiveTodos }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: countActiveTodos === 0,
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
