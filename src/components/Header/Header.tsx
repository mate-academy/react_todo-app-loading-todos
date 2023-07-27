import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  // userId: number,
  activeTodos: Todo[],
  // onSetLoadingTodo: (id: number) => void,
};

export const Header: React.FC<Props> = ({ activeTodos }) => {
  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line */}
      <button
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
