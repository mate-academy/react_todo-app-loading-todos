import React, { useState } from 'react';

interface HeaderProps {
  onAddTodo: (title: string, completed: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      return;
    }

    onAddTodo(title, completed);
    setTitle('');
    setCompleted(false);
  };

  return (
    <header className="todoapp__header">
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
