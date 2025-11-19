import React from 'react';
import classNames from 'classnames';

type Props = {
  activeTodos: number;
  todosLength: number;
};

export const TodoHeader: React.FC<Props> = ({ activeTodos, todosLength }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: todosLength > 0 && activeTodos === 0,
      })}
      data-cy="ToggleAllButton"
      disabled
    />

    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        disabled
      />
    </form>
  </header>
);
