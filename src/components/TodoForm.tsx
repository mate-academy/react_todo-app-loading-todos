import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoForm: React.FC<Props> = ({ todos }) => {
  const isTodosToShow = !!todos.length;

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}

      {isTodosToShow && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
          aria-label="New Todo"
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
