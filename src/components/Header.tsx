import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const Header: React.FC<Props> = ({ todos }) => {
  const allAreCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: allAreCompleted,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
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
};
