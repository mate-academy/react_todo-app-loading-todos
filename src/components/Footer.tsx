import { Todo } from '../types/Todo';
import React from 'react';
import { deleteTodo } from '../api/todos';
import { ErrorType } from '../enums/error';
import { FilterType } from '../enums/FilterType';

type Props = {
  todos: Todo[];
  sortBy: string;
  setSortBy: (value: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<number[] | null>>;
  setHasError: React.Dispatch<React.SetStateAction<string>>;
};

export const filters: FilterType[] = [
  FilterType.All,
  FilterType.ACTIVE,
  FilterType.COMPLETED,
];

export const Footer: React.FC<Props> = ({
  todos,
  sortBy,
  setSortBy,
  setTodos,
  setLoading,
  setHasError,
}) => {
  if (todos.length === 0) {
    return null;
  }

  const clearCompletedTodos = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    const completedIds = completedTodos.map(todo => todo.id);

    setLoading(prev => [...(prev || []), ...completedIds]);

    Promise.allSettled(completedTodos.map(todo => deleteTodo(todo.id)))
      .then(results => {
        const successfulIds: number[] = [];
        const failed = results.some(r => r.status === 'rejected');

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            successfulIds.push(completedTodos[index].id);
          }
        });

        setTodos(current =>
          current.filter(todo => !successfulIds.includes(todo.id)),
        );

        if (failed) {
          setHasError(ErrorType.DELETE);
        }
      })
      .finally(() => {
        setLoading(prev =>
          (prev || []).filter(id => !completedIds.includes(id)),
        );
      });
  };

  const hasAnyCompletedTodo: boolean =
    todos.filter((todo: Todo) => todo.completed === true).length > 0;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter((todo: Todo) => todo.completed === false).length} items
        left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(filter => (
          <a
            key={filter}
            href={`#/${filter}`}
            className={
              sortBy === filter ? 'filter__link selected' : 'filter__link'
            }
            data-cy={
              filter === FilterType.All
                ? 'FilterLinkAll'
                : filter === FilterType.ACTIVE
                  ? 'FilterLinkActive'
                  : 'FilterLinkCompleted'
            }
            onClick={() => setSortBy(filter)}
          >
            {filter[0].toUpperCase() + filter.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!hasAnyCompletedTodo}
        data-cy="ClearCompletedButton"
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
