import React from 'react';

// #Import
import { Todo } from '../../types/Todo';

// #Props
interface HeaderProps {
  todos: Todo[];
  serchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  todos,
  serchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          value={serchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
