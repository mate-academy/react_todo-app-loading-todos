import React from 'react';

export const NewTodoField: React.FC = () => {
  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todo__new"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
