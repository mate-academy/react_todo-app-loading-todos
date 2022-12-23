import React, { RefObject } from 'react';

type Props = {
  newTodoField: RefObject<HTMLInputElement>;
  query: string;
  onQueryChange: (value: string) => void;
  onErrorChange: (value: boolean) => void;
};

export const TodoForm: React.FC<Props> = ({
  newTodoField,
  query,
  onQueryChange,
  onErrorChange,
}) => {
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.length) {
      onErrorChange(true);
    }

    setTimeout(() => {
      onErrorChange(false);
    }, 3000);
  };

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        aria-label="toggle"
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
