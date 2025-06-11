import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type HeaderProps = {
  todos: Todo[];
  isLoading: boolean;
};

export const Header: React.FC<HeaderProps> = ({ todos, isLoading }) => {
  return (
    <header className="todoapp__header">
      {!isLoading && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
