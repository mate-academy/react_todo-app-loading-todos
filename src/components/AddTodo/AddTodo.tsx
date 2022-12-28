import React, { useState } from 'react';

type Props = {
  addTodo: (arg0: string) => void,
  newTodoField: React.RefObject<HTMLInputElement>,
};

export const AddTodo: React.FC<Props> = ({ addTodo, newTodoField }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (value) {
      addTodo(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </form>
  );
};
