/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { ErrorsMessages } from '../../types/ErrorsMessages';

type Props = {
  todos: Todo[],
  doPostTodo: (newTodoTitle: string) => Promise<void>,
  handleChecker: (id: number, data: unknown) => Promise<void>,
  errorMessage: (message: ErrorsMessages) => void
  disabled: boolean,
};

export const Header: React.FC<Props> = ({
  todos,
  doPostTodo,
  handleChecker,
  errorMessage,
  disabled,
}) => {
  const [newTodo, setNewTodo] = useState('');
  const isActive = todos.every(todo => todo.completed);

  const validateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim().length === 0) {
      errorMessage(ErrorsMessages.Title);
    }

    if (newTodo.trim().length > 0) {
      doPostTodo(newTodo);
      setNewTodo('');
    }
  };

  const switchCompletedTodos = () => {
    if (isActive) {
      return todos.map(todo => handleChecker(todo.id, { completed: false }));
    }

    return todos.map(todo => handleChecker(todo.id, { completed: true }));
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: isActive },
        )}
        onClick={switchCompletedTodos}
      />
      <form onSubmit={validateTodo}>
        <input
          type="text"
          className="todoapp__new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          disabled={disabled}
        />
      </form>
    </header>
  );
};
