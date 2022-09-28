import React, { RefObject } from 'react';

type Props = {
  newTodosField: RefObject<HTMLInputElement>,
};

export const Header: React.FC<Props> = ({ newTodosField }) => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="close"
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodosField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
