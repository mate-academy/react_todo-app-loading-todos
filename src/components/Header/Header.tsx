import React from 'react';

interface Props {
  query: string,
  setQuery: (query: string) => void,
}

export const Header: React.FC<Props> = ({ query, setQuery }) => (
  <header className="todoapp__header">
    {/* this buttons is active only if there are some active todos */}
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <button type="button" className="todoapp__toggle-all active" />

    {/* Add a todo on form submit */}
    <form>
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
