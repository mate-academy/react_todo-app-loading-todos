import React from 'react';
import { Todo } from '../types/Todo';

interface HeaderProps {
  newTodoTitle: string;
  setNewTodoTitle: (title: string) => void;
  addTodo: (title: string) => void;
  toggleAllTodos: () => void;
  todos: Todo[];
  isAnyLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  newTodoTitle,
  setNewTodoTitle,
  addTodo,
  toggleAllTodos,
  todos,
  isAnyLoading,
}) => (
  <header className="todoapp__header">
    {todos.length > 0 && (
      <button
        type="button"
        className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={toggleAllTodos}
        disabled={isAnyLoading}
      />
    )}
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!newTodoTitle.trim()) {
          return;
        }

        addTodo(newTodoTitle);
        setNewTodoTitle('');
      }}
    >
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={e => setNewTodoTitle(e.target.value)}
        disabled={isAnyLoading}
      />
    </form>
  </header>
);
