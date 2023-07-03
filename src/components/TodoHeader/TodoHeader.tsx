import React from 'react';
import cn from 'classnames';

type Props = {
  isVisibleToggleAllActive: boolean,
};

export const TodoHeader: React.FC<Props> = ({ isVisibleToggleAllActive }) => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="toggle-all active"
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isVisibleToggleAllActive,
        })}
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
};
