import React, { useEffect, useState, useRef } from 'react';

type Props = {
  onAdd: (title: string) => void;
  loading: boolean;
};

export const NewTodoForm: React.FC<Props> = ({ onAdd, loading }) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    onAdd(trimmed);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} data-cy="NewTodoForm">
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        value={title}
        onChange={event => setTitle(event.target.value)}
        placeholder="What needs to be done?"
        disabled={loading}
        autoFocus
      />
    </form>
  );
};
