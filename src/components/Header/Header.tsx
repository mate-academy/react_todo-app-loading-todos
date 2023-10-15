import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  USER_ID: number;
  toggleAll: boolean;
  handleToggleAll: () => void;
  setErrorMessage: (arg: string) => void;
};

export const Header: React.FC<Props> = ({
  todos,
  setTodos,
  USER_ID,
  toggleAll,
  handleToggleAll,
  setErrorMessage,
}) => {
  const [title, setTitle] = useState('');

  function addTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Title should not be empty');

      return;
    }

    setErrorMessage('');

    addTodo({
      id: todos.length,
      userId: USER_ID,
      title: title.trim(),
      completed: false,
    });

    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          aria-label="button"
          type="button"
          className={`todoapp__toggle-all ${toggleAll ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
          style={{ outline: 'none' }}
        />
      </form>
    </header>
  );
};
