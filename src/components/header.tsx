import React from 'react';

interface Props {
  query: string;
  handleChange:any;
  newTodoField: any;
}

export const Header: React.FC<Props>
= ({ query, handleChange, newTodoField }) => {
  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
        aria-label="ToggleAllButton"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(value) => handleChange(value)}
        />
      </form>
    </header>
  );
};
