import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const Header: React.FC<Props> = ({ todos }) => {
  const visibleToogleAllButton = !!todos.length;

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {visibleToogleAllButton && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: false })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
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
