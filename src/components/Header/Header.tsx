import React, { useEffect, useRef } from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  query: string;
  todos: Todo[];
  setQuery: (value: string) => void;
};

export const Header: React.FC<Props> = ({ query, todos, setQuery }) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      {todos && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          aria-label="Toggle"
          className="todoapp__toggle-all active"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
