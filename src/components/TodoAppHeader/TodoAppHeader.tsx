import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  newTodoField: React.RefObject<HTMLInputElement>
  todos: Todo[],
}

export const TodoAppHeader: React.FC<Props> = ({ newTodoField, todos }) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className="todoapp__toggle-all active"
          aria-label="Mute volume"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
