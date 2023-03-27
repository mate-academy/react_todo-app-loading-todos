/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  sendToServer2: (newTodoTitle: string) => Promise<void>,
  // handleChecker: (id: number, completed: boolean) => Promise<void>,
  handleChecker: (id: number, data: unknown) => Promise<void>,
};

export const Header: React.FC<Props> = ({
  todos,
  sendToServer2,
  handleChecker,
}) => {
  const [newTodo, setNewTodo] = useState('');
  const isActive = todos.every(todo => todo.completed);

  const validateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim().length > 0) {
      sendToServer2(newTodo);
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
        />
      </form>
    </header>
  );
};
