import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const Header: React.FC<Props> = ({ todos }) => {
  const toggleButton = (
    <button
      type="button"
      className={cn('todoapp__toggle-all', {
        active: todos.every(todo => todo.completed),
      })}
      aria-label="todoapp__toggle-all"
    />
  );

  return (
    <header className="todoapp__header">
      {toggleButton}

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
