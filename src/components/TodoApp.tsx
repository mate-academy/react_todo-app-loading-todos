import React from 'react';

export const TodoApp: React.FC = () => {
  return (
    <header className="todoapp__header">
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
