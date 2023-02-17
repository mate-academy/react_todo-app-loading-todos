import React from 'react';

export const NewFormTodo: React.FC = () => {
  return (
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
