import React from 'react';

type Props = {
  query: string;
  setQuery: (query: string) => void;
};

export const Header: React.FC<Props> = React.memo(({
  query,
  setQuery,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        aria-label="toggle-all"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />
      </form>
      {/* this buttons is active only if there are some active todos */}

    </header>
  );
});
