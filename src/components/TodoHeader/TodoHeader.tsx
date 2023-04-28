import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoHeader: React.FC<Props> = ({ todos }) => {
  const isAllTodosActive = todos.every(todo => todo.completed === true);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          aria-label="toggle-all"
          className={classNames('todoapp__toggle-all', {
            active: isAllTodosActive,
          })}
        />
      )}

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
