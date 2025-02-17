import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  onAdd: (newTodoTitle: string) => void;
}

export const Header: React.FC<Props> = ({ onAdd, todos }) => {
  const [query, setQuery] = useState('');

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(query);
    setQuery('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={
          'todoapp__toggle-all ' +
          (todos.every(({ completed }) => completed) ? 'active' : '')
        }
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
