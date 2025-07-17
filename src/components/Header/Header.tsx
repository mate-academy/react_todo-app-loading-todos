import React from 'react';
import classNames from 'classnames';

type Props = {
  todosLength: number;
  allCompleted: boolean;
};

export const Header: React.FC<Props> = ({
  todosLength,
  allCompleted,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todosLength > 0 && allCompleted,
        })}
        data-cy="ToggleAllButton"
      />
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
