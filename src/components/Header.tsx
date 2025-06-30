import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
};

export const Header: React.FC<Props> = ({
  todos,
  setTodos,
  setErrorMessage,
  loading,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) {
      setErrorMessage("Title can't be empty");

      return;
    }

    // Simulează adăugarea unui todo
    const newTodo: Todo = {
      id: +new Date(),
      userId: 1,
      title: newTodoTitle,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setNewTodoTitle('');
  };

  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {/* Active class doar dacă toate sunt completate */}
      <button
        type="button"
        className={
          todos.length > 0 && todos.every(todo => todo.completed)
            ? 'todoapp__toggle-all active'
            : 'todoapp__toggle-all'
        }
        data-cy="ToggleAllButton"
        onClick={() => {
          const updated = todos.map(todo => ({
            ...todo,
            completed: !areAllCompleted,
          }));

          setTodos(updated);
        }}
        disabled={loading}
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
          disabled={loading}
        />
      </form>
    </header>
  );
};
