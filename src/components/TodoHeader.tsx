import React, { useState, FormEvent } from 'react';
import '../styles/index.scss';

interface Props {
  isLoading: boolean;
  onAdd: (title: string) => void;
}

const TodoHeader: React.FC<Props> = ({ isLoading, onAdd }) => {
  const [newTitle, setNewTitle] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();

    if (!title) {
      return;
    }

    onAdd(title);
    setNewTitle('');
  };

  return (
    <header className="todoapp__header" data-cy="Header">
      <h1 className="todoapp__title">todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          disabled={isLoading}
          autoFocus
          data-cy="NewTodoField"
        />
        <button
          type="submit"
          disabled={isLoading || newTitle.trim() === ''}
          className="todoapp__add-button"
          data-cy="AddTodoButton"
        ></button>
      </form>
    </header>
  );
};

export default React.memo(TodoHeader);
