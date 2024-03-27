import React, { useState } from 'react';
import { useTodos } from '../../utils/TodoContext';
import { USER_ID } from '../../api/todos';

export const TodoHeader: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const { addTodo, setTodos, todos, isLoading } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!query || isLoading) {
      return;
    }

    e.preventDefault();
    addTodo({
      id: Date.now(),
      title: query,
      completed: false,
      userId: USER_ID,
    });
    setQuery('');
  };

  const toggleCompletedAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={toggleCompletedAll}
      />

      <form name="todo-text" onSubmit={handleSubmit}>
        <input
          value={query}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
