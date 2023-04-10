import React from 'react';

export const Header: React.FC = () => (
  <header className="todoapp__header">
    <button
      type="button"
      aria-label="toggle-allbutton"
      className="todoapp__toggle-all active"
    />

    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
