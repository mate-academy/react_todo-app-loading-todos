import React from 'react';
import classNames from 'classnames';

type Props = {
  activeTodos: number;
};

export const Header: React.FC<Props> = React.memo(({ activeTodos }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: activeTodos === 0,
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
