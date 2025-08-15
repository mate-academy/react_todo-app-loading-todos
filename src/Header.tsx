import React, { useState } from 'react';
import { Todo } from './types/Todo';

interface HeaderProps {
  todos: Todo[];
  onAddTodo: (title: string) => void;
  onToggleAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  todos,
  onAddTodo,
  onToggleAll,
}) => {
  const [inputValue, setInputValue] = useState('');

  const allTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = inputValue.trim();

    if (trimmedTitle) {
      onAddTodo(trimmedTitle);
      setInputValue('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${allTodosCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={onToggleAll}
        aria-label="Toggle all todos"
      ></button>

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </form>
    </header>
  );
};
