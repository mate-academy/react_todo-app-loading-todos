import classNames from 'classnames';
import React from 'react';

type Props = {
  isAllTodosCompleted: boolean;
};

export const TodoHeader: React.FC<Props> = ({ isAllTodosCompleted }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isAllTodosCompleted,
        })}
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          autoFocus
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
