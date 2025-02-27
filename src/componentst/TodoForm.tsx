import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoForm: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
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
    </>
  );
};
