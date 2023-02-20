import classNames from 'classnames';
import React from 'react';

type Props = {
  count: number;
  isActiveCount: number,
};

export const Header: React.FC<Props> = ({ count, isActiveCount }) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {count > 0 && (
        <button
          aria-label="complited todo"
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !isActiveCount
          })}
        />
      )}

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
};
