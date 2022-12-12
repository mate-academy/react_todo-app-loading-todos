/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { RefObject } from 'react';

type Props = {
  newTodoField: RefObject<HTMLInputElement>;
  query: string;
  error: boolean;
  onQueryChange: (value: string) => void;
  onErrorChange: (value: string) => void;
};

export const Header: React.FC<Props> = ({
  newTodoField,
  query,
  error,
  onQueryChange,
  onErrorChange,
}) => {
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
      />

      <form
        onSubmit={handleFormSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </form>
    </header>
  );
};
