import React, { useState } from 'react';
import classNames from 'classnames';
import { useSetTodoContext, useTodoContext } from '../TodoContextProvider';

export const TodoForm: React.FC = () => {
  const { todos } = useTodoContext();
  const { setError } = useSetTodoContext();
  const [query, setQuery] = useState<string>('');

  const hasActiveTodos = todos.some(todo => !todo.completed);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      setError('Unable to add a todo');
    } else {
      setQuery('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={
          classNames('todoapp__toggle-all', {
            active: hasActiveTodos,
          })
        }
        aria-label="toggle all todos status"
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
