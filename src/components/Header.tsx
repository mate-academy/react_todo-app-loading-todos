import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface HeaderProps {
  onAddTodo: (title: string) => void;
  todos: Todo[];
  onToggleAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onAddTodo,
  todos,
  onToggleAll,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTodoTitle.trim()) {
      onAddTodo(newTodoTitle.trim()); // Додаємо TODO, якщо поле не пусте
      setNewTodoTitle(''); // Очищаємо поле введення
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  const allTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        // className="todoapp__toggle-all active"
        className={`todoapp__toggle-all ${allTodosCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={onToggleAll}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={handleInputChange}
        />
        {newTodoTitle}
      </form>
    </header>
  );
};
