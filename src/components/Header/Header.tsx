import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  query: string,
  todos: Todo[],
  setQuery: (query: string) => void,
};

export const Header: React.FC<Props> = ({ query, todos, setQuery }) => {
  const isActiveTodos = todos.some(todo => todo.completed === false);
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <header className="todoapp__header">
      {isActiveTodos && (
        /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
        <button
          type="button"
          className="todoapp__toggle-all active"
        />
      )}

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};
