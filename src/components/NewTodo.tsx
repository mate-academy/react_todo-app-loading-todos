import React, { useState } from 'react';

interface NewTodoProps {
  onAddTodo: (title: string) => void;
  handleEmpty: () => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onAddTodo, handleEmpty }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title);
      setTitle('');
    } else {
      handleEmpty();
    }
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
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};

export default NewTodo;
