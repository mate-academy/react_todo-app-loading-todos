import React from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};
export const Header: React.FC<Props> = ({ todos }) => {
  const areTodosAllCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: areTodosAllCompleted,
        })}
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </header>
  );
};
