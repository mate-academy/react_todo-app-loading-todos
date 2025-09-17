import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import * as todoService from '../../api/todos';
import { ErrorMessages } from '../../types/Errors';

type FilterTypes = 'All' | 'Active' | 'Completed';

interface Props {
  todos: Todo[];
  filterType: FilterTypes;
  onFilterType: (v: FilterTypes) => void;
  onTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onLoading: React.Dispatch<React.SetStateAction<number[]>>;
  onErrorMessage: (message: ErrorMessages) => void;
}

export const Footer: React.FC<Props> = ({
  todos,
  filterType,
  onFilterType,
  onTodos,
  onLoading,
  onErrorMessage,
}) => {
  const handleFilterAll = () => {
    onFilterType('All');
  };

  const handleFilterActive = () => {
    onFilterType('Active');
  };

  const handleFilterCompleted = () => {
    onFilterType('Completed');
  };

  function deleteCompletedTodos() {
    todos.map(todo => {
      if (todo.completed) {
        onLoading(prev => [...prev, todo.id]);
        todoService
          .deleteTodos(todo.id)
          .then(() =>
            onTodos(currentTodos =>
              currentTodos.filter(currentTodo => currentTodo.id !== todo.id),
            ),
          )
          .catch(() => onErrorMessage(ErrorMessages.Delete))
          .finally(() =>
            onLoading(prev => prev.filter(item => item !== todo.id)),
          );
      }
    });
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {[...todos].filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={handleFilterAll}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={handleFilterActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleFilterCompleted}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={[...todos].filter(todo => todo.completed).length === 0}
        onClick={deleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
