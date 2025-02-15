import classNames from 'classnames';
import { Todo } from '../types/Todo';
import React from 'react';

type Props = {
  todos: Todo[];
};

export const TodoHeader: React.FC<Props> = ({ todos }) => {
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: completedTodos.length === todos.length,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
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
