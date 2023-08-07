/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoHeader: React.FC<Props> = ({ todos }) => {
  const isSomeVisible = !!todos.length;
  const isEveryCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {isSomeVisible && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isEveryCompleted,
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
