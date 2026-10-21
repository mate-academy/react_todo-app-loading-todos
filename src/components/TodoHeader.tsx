import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoHeader: React.FC<Props> = ({ todos }) => {
  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isAllCompleted,
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
