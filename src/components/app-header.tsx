import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { Errors } from '../types/errors';

type Props = {
  setError: (val: string | null) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>;
  todos: Todo[];
};

export const AppHeader: React.FC<Props> = ({ setError }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      setError(Errors.errorEmptyTitle);

      return;
    }

    setError(null);
    setQuery('');
  };

  return (
    <header className="todoapp__header">
      <button type="button" className="todoapp__toggle-all active" />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setError(null);
          }}
        />
      </form>
    </header>
  );
};
