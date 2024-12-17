import React, { useState } from 'react';
import { USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';

interface HeaderProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  showError: (message: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ todos, setTodos, showError }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      const newTodo = {
        id: Date.now(),
        userId: USER_ID,
        title: trimmedTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
    } else {
      showError('Title should not be empty');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all"
        data-cy="ToggleAllButton"
        onClick={() => {
          const areAllCompleted = todos.every(todo => todo.completed);
          const updatedTodos = todos.map(todo => ({
            ...todo,
            completed: !areAllCompleted,
          }));
          setTodos(updatedTodos);
        }}
      />
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
