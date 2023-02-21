import React from 'react';
import classNames from 'classnames';

type Props = {
  activeTodosAmount: number;
};

export const Header: React.FC<Props> = React.memo(({ activeTodosAmount }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: !activeTodosAmount,
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
