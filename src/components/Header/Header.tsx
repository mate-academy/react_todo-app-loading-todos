import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  search: string,
  setSearch: (query: string) => void,
};

export const Header: React.FC<Props> = ({
  todos,
  search,
  setSearch,
}) => {
  const isActive = todos.filter(todo => !todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: isActive },
        )}
        aria-label="saveButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </form>
    </header>
  );
};
