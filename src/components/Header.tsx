import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  query: string;
  setQuery: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  toggleAll: () => void;
  tempTodo: Todo | null;
  todoFieldRef: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({
  todos,
  query,
  setQuery,
  handleSubmit,
  toggleAll,
  tempTodo,
  todoFieldRef,
}) => (
  <header className="todoapp__header">
    {todos.length > 0 && (
      <button
        type="button"
        className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={toggleAll}
      />
    )}

    <form onSubmit={handleSubmit}>
      <input
        ref={todoFieldRef}
        autoFocus
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={e => setQuery(e.target.value)}
        disabled={!!tempTodo}
      />
    </form>
  </header>
);
