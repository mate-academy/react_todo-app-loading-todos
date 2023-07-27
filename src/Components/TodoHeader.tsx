/* eslint-disable no-console */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoHeader: React.FC<Props> = ({ todos }) => {
  const countActiveTodods = todos.filter(todo => !todo.completed).length;

  console.log(countActiveTodods);

  return (
    <header className="todoapp__header">
      {todos.length > 0
          && (
            <button
              aria-label="btn"
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: countActiveTodods > 0,
              })}
            />
          )}

      {/* Add a todo on form submit */}
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
