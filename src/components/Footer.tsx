import React from 'react';
import { Todo } from '../types/Todo';
import { Filter } from './Filter';

type Props = {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  incompleteCount: number;
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  setFilter,
  incompleteCount,
}) => {
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {incompleteCount} items left
      </span>

      <Filter filter={filter} setFilter={setFilter} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={() => {}}
      >
        Clear completed
      </button>
    </footer>
  );
};
