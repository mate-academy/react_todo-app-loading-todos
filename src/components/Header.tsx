/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  querySearch: string,
  setQuerySearch: (query: string) => void,
};

export const Header: React.FC<Props> = ({
  todos,
  querySearch,
  setQuerySearch,
}) => {
  const isActicve = todos.filter(todo => !todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: isActicve },
        )}
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={querySearch}
          onChange={(event) => setQuerySearch(event.target.value)}
        />
      </form>
    </header>
  );
};
