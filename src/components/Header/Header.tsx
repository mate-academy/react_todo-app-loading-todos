/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  query: string;
  onQuery: (event: React.SetStateAction<string>) => void;
  visibleTodos: Todo[];
}

export const Header: React.FC<Props> = ({
  query,
  onQuery,
  visibleTodos,
}) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {visibleTodos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: visibleTodos.every(todo => todo.completed),
          })}
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
