import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  activeTodos: number,
};

export const Header: React.FC<Props> = React.memo(({
  todos,
  activeTodos,
}) => (
  <header className="todoapp__header">
    {todos.length !== 0 && (
      <button
        type="button"
        aria-label="toggle button"
        className={cn(
          'todoapp__toggle-all',
          { active: !activeTodos },
        )}
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
));
