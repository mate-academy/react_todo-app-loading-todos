import React from 'react';

export const TodoHeader: React.FC = () => {
  return (
    <header className="todoapp__header">
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
