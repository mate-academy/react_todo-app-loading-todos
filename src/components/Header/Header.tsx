import React, { RefObject } from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  newTodoField: RefObject<HTMLInputElement>,
  todos: Todo[],
};

export const Header: React.FC<Props> = ({ newTodoField, todos }) => (
  <header className="todoapp__header">
    {todos.length > 0 && (
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
        aria-label="all"
      />
    )}

    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
