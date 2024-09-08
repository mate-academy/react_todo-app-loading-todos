import React, { memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

import './Header.scss';

type Props = {
  todos: Todo[];
  onToggle: (toggledTodos: Todo[]) => void;
};

export const Header: React.FC<Props> = memo(function Header({
  todos,
  onToggle,
}) {
  const areAllTodosCompleted = todos.every(todo => todo.completed);

  return (
    <header className="Header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('Header__toggle-all', {
            active: areAllTodosCompleted,
          })}
          onClick={() => {
            onToggle(
              todos.map(todo => ({
                ...todo,
                completed: !areAllTodosCompleted,
              })),
            );
          }}
          data-cy="ToggleAllButton"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="Header__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
});
