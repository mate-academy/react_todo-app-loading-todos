import React from 'react';

import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { TodoFilter } from './TodoFilter';

type Props = {
  todos: Todo[];
  activeCount: number;
  filter: Status;
  setFilter: (status: Status) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  activeCount,
  filter,
  setFilter,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>

    <TodoFilter filter={filter} setFilter={setFilter} />

    {/* this button should be disabled if there are no completed todos */}
    <button
      disabled={!todos.some(todo => todo.completed)}
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
    >
      Clear completed
    </button>
  </footer>
);
