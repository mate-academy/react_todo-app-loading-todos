/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

type Props = {
  activeTodosCount: number;
};

export const Header: React.FC<Props> = ({ activeTodosCount }) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {activeTodosCount > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
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
