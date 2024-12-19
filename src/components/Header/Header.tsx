import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  onTodo: (todo: Todo) => void;
  onError: (v: string) => void;
};

export const Header: React.FC<Props> = ({ onTodo, onError }) => {
  const [query, setQuery] = useState('');
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    if (query.trim().length > 0) {
      event.preventDefault();

      const newTodo = {
        id: +new Date(),
        userId: 2177,
        title: query,
        completed: false,
      };

      onTodo(newTodo);
      setQuery('');
      onError('');
    } else {
      onError('Title should not be empty');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleQueryChange}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus
        />
      </form>
    </header>
  );
};
