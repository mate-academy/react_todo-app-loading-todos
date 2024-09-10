import React from 'react';
import cn from 'classnames';
import { TodoFilterOptions } from '../../types/TodoFiltersOptions';

type Props = {
  activeTodoFilter: TodoFilterOptions;
  setTodoFilterValue: React.Dispatch<React.SetStateAction<TodoFilterOptions>>;
  uncompletedTodosCount: number;
  completedTodosCount: number;
  clearCompletedTodos?: () => void;
};

export const Footer: React.FC<Props> = ({
  activeTodoFilter,
  setTodoFilterValue,
  uncompletedTodosCount,
  completedTodosCount,
  clearCompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${uncompletedTodosCount} ${uncompletedTodosCount === 1 ? 'item' : 'items'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: activeTodoFilter === TodoFilterOptions.All,
          })}
          onClick={() => setTodoFilterValue(TodoFilterOptions.All)}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: activeTodoFilter === TodoFilterOptions.Active,
          })}
          onClick={() => setTodoFilterValue(TodoFilterOptions.Active)}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: activeTodoFilter === TodoFilterOptions.Completed,
          })}
          onClick={() => setTodoFilterValue(TodoFilterOptions.Completed)}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodosCount === 0}
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
