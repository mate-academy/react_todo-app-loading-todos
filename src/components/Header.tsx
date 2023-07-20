import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
};

export const Header: React.FC<Props> = ({ todos }) => {
  const isActiveTodos = todos.filter(todo => !todo.completed);

  return (
    <header className="todoapp__header">
      {isActiveTodos && (
        <button
          type="button"
          aria-label="button"
          className="todoapp__toggle-all active"
        />
      )}

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
