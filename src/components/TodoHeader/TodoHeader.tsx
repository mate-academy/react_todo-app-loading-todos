import React, { useContext, useEffect, useRef } from 'react';

import { TodoListContext } from '../../contexts/TodoListContext';

export const TodoHeader = () => {
  const todoFieldRef = useRef<HTMLInputElement>(null);
  const { todos } = useContext(TodoListContext);

  useEffect(() => {
    todoFieldRef.current?.focus();
  }, [todos]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          ref={todoFieldRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
