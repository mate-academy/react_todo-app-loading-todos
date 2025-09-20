import React from 'react';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  toggleAll: () => void;
  hasTodos: boolean;
};

export const Header: React.FC<Props> = ({
  query,
  setQuery,
  handleSubmit,
  toggleAll,
  hasTodos,
}) => (
  <header className="todoapp__header">
    {hasTodos && (
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={toggleAll}
      />
    )}

    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        value={query}
        placeholder="What needs to be done?"
        onChange={event => setQuery(event.target.value)}
      />
    </form>
  </header>
);
