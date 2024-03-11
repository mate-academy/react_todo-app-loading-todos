import React from 'react';

interface Props {
  query: string;
  setQuery: (query: string) => void;
}

export const Header: React.FC<Props> = React.memo(({ query, setQuery }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all"
        data-cy="ToggleAllButton"
        aria-label="Toggle all todos"
      />

      <form>
        <label htmlFor="newTodo">
          <input
            id="newTodo"
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </label>
      </form>
    </header>
  );
});
