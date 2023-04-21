import React from 'react';

export const Header: React.FC = () => (
  <header className="todoapp__header">
    <button
      type="button"
      className="todoapp__toggle-all active"
      aria-label="ALL"
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
