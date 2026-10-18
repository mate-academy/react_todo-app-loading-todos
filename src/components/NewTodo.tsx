import React from 'react';

export const NewTodo: React.FC = () => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
