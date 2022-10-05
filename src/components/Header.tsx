import React, { RefObject } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  newTodoField: RefObject<HTMLInputElement>,
  query: string,
  onSetQuery: (value: string) => void,
  onSetError: (value: boolean) => void,
};

export const Header: React.FC<Props> = ({
  todos,
  newTodoField,
  query,
  onSetQuery,
  onSetError,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className="todoapp__toggle-all active"
          aria-label="button"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => {
            onSetQuery(event.target.value);
            onSetError(true);
          }}
        />
      </form>
    </header>
  );
};
