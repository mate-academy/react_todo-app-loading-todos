/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="todoapp__header">
      <button type="button" className="todoapp__toggle-all active" />

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
