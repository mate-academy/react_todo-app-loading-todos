import React, { useState } from 'react';
import classNames from 'classnames';
import { useTodos } from '../../TodosContext';

export const Header: React.FC = () => {
  const {
    todos,
    addTodo,
    toggleAll,
    setErrorMessage,
    removeErrorIn3sec,
  } = useTodos();

  const [title, setTitle] = useState('');

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Title should not be empty');

      removeErrorIn3sec();

      return;
    }

    addTodo(title);
    setTitle('');
  };

  const areAllTodosCompleated = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllTodosCompleated,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitle}
        />
      </form>
    </header>
  );
};
