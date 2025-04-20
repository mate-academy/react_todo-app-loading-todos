import React from 'react';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const FormAddTodo = ({ onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
