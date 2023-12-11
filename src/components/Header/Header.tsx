import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';

export const Header: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setQuery('');
  };

  const isActiveButton = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          aria-label="toggle-all"
          type="button"
          className={cn('todoapp__toggle-all', {
            active: isActiveButton,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <form
        onSubmit={handleSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />
      </form>
    </header>
  );
};
