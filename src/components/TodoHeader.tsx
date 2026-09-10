import React from 'react';
import classNames from 'classnames';

type Props = {
  hasTodos: boolean;
  isAllCompleted: boolean;
};

export const TodoHeader: React.FC<Props> = ({ hasTodos, isAllCompleted }) => (
  <header className="todoapp__header">
    {hasTodos && (
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isAllCompleted,
        })}
        data-cy="ToggleAllButton"
      />
    )}

    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  </header>
);
