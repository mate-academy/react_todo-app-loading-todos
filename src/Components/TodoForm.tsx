import React, { FormEvent, useState } from 'react';

type Props = {
  onError: (error: string) => void;
  addTodo: (todo: string) => void;
};

export const TodoForm: React.FC<Props> = ({ onError, addTodo }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      onError('Title should not be empty');

      return;
    }

    addTodo(title);
    setTitle('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleChange}
      />
    </form>
  );
};
