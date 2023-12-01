import React from 'react';
import { TodoForm } from '../TodoForm';

export const Header: React.FC = () => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        aria-label="Show active todo"
      />
      {/* Add a todo on form submit */}
      <TodoForm />
    </header>
  );
};
