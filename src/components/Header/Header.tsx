import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  activeTodos: Todo[],
};

export const Header: React.FC<Props> = ({ activeTodos }) => {
  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <header className="todoapp__header">
      <button
        aria-label="Select-all-or-Deselect-all"
        type="button"
        className={classNames(
          'todoapp__toggle-all', { active: activeTodos.length < 1 },
        )}
        onClick={() => { }}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
