import React from 'react';
import { Todo } from '../types/Todo';
import * as todosApi from '../api/todos';

const FILTERS = [
  { label: 'All', value: '', cy: 'FilterLinkAll' },
  { label: 'Active', value: 'active', cy: 'FilterLinkActive' },
  { label: 'Completed', value: 'completed', cy: 'FilterLinkCompleted' },
];

type Props = {
  leftItems: number;
  query: string;
  setQuery: (query: string) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setError: (error: string) => void;
};

export const Footer: React.FC<Props> = ({
  leftItems,
  query,
  setQuery,
  todos,
  setTodos,
  setError,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {leftItems} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {FILTERS.map(({ label, value, cy }) => (
          <a
            key={value}
            href={`#/${value}`}
            className={`filter__link ${query === value ? 'selected' : ''}`}
            data-cy={cy}
            onClick={() => setQuery(value)}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          todos.map(todoItem => {
            if (todoItem.completed) {
              todosApi
                .deleteTodo(todoItem.id)
                .then(() => {
                  setTodos(
                    todos.filter(
                      filteredTodoItem => !filteredTodoItem.completed,
                    ),
                  );
                })
                .catch(() => {
                  setError('Unable to delete a todo');
                  setTimeout(() => {
                    setError('');
                  }, 3000);
                });
            }
          });
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
