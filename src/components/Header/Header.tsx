import React, { useContext, useState } from 'react';
import { TodoContext } from '../../TodoContext';
import classNames from 'classnames';

type Props = {};

export const Header: React.FC<Props> = () => {
  const { todos, updateTodo, addTodo, setErrorMessage } =
    useContext(TodoContext);
  const [title, setTitle] = useState('');

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const handleToggleTodos = () => {
    if (completedTodos.length === todos.length) {
      for (const todo of completedTodos) {
        updateTodo({ ...todo, completed: false });
      }

      return;
    }

    for (const todo of activeTodos) {
      updateTodo({ ...todo, completed: true });
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setErrorMessage('Title should not be empty');

      return;
    }

    setTitle('');
    addTodo(title).catch(() => setTitle(title));
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: completedTodos.length === todos.length,
        })}
        data-cy="ToggleAllButton"
        onClick={handleToggleTodos}
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={title}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
