import React from 'react';
import { Todo } from '../types/Todo';

interface Props {
  query: string;
  handleAddTodo: (event: React.FormEvent<HTMLFormElement>) => void;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  todos: Todo[];
}

export const Header: React.FC<Props> = ({
  query,
  handleAddTodo,
  handleQueryChange,
  todos,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}
      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleQueryChange}
          autoFocus
        />
      </form>
    </header>
  );
};
