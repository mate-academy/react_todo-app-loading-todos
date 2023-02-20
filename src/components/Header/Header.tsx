import React from 'react';
import cn from 'classnames';

interface Props {
  hasActiveTodos: boolean;
}

export const Header: React.FC<Props> = ({ hasActiveTodos }) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}

      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: !hasActiveTodos,
        })}
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
};
