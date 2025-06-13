import React, { useState } from 'react';

interface Props {
  onTodoAdded: (title: string) => void;
  isLoading: boolean;
}

export const AddNewTodo: React.FC<Props> = ({ onTodoAdded, isLoading }) => {
  const [title, setTitle] = useState('');

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onTodoAdded(title.trim());
    setTitle('');
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
        disabled={isLoading}
      />
    </form>
  );
};
