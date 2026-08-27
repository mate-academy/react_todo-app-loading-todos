import React from 'react';

type Props = {
  hasTodos: boolean;
};

export const Header: React.FC<Props> = ({ hasTodos }) => {
  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          className="todoapp__toggle-all"
          data-cy="ToggleAllButton"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
