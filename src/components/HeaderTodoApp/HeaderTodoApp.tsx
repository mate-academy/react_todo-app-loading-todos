/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  FC, FormEvent, useState,
} from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setError: (error: string) => void;
}

export const HeaderTodoApp: FC<Props> = React.memo(({
  todos,
  setError,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!query) {
      setError("Title can't be empty");

      return;
    }

    setQuery('');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
        />
      )}

      <form
        onSubmit={handleSubmit}
      >
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
});
