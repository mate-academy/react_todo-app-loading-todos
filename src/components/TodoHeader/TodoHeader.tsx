import React from 'react';

interface Props {
  isTodosPresent: boolean;
}

export const TodoHeader: React.FC<Props> = ({ isTodosPresent }) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {isTodosPresent && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          aria-label="Show todos"
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
