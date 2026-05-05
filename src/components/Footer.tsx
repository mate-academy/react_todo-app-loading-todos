import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todosFormServer: Todo[] | null;
  setTodos: (todos: Todo[]) => void;
  updateList: () => void;
  deleteTodo: (id: number) => void;
};

enum TypeFilter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

function getCount(todos: Todo[] | null) {
  let count = 0;

  if (todos && todos.length > 0) {
    todos.forEach(todo => {
      if (todo.completed === false) {
        count++;
      }
    });
  }

  return count;
}

export const Footer: React.FC<Props> = ({
  setTodos,
  updateList,
  todosFormServer,
  deleteTodo,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(TypeFilter.All);

  function onlyActive() {
    if (todosFormServer) {
      const newTodos: Todo[] = todosFormServer.filter((todo: Todo) => {
        return todo.completed === false;
      });

      setTodos(newTodos);
    }
  }

  function onlyCompleted() {
    if (todosFormServer) {
      const newTodos: Todo[] = todosFormServer.filter((todo: Todo) => {
        return todo.completed === true;
      });

      setTodos(newTodos);
    }
  }

  function clearCompleted() {
    if (todosFormServer) {
      todosFormServer.map((todo: Todo) => {
        if (todo.completed === true) {
          deleteTodo(todo.id);
        }
      });
    }
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${getCount(todosFormServer)} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === TypeFilter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={e => {
            e.preventDefault();
            setSelectedFilter(TypeFilter.All);
            updateList();
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === TypeFilter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={e => {
            e.preventDefault();
            setSelectedFilter(TypeFilter.Active);
            onlyActive();
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === TypeFilter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={e => {
            e.preventDefault();
            setSelectedFilter(TypeFilter.Completed);
            onlyCompleted();
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          clearCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
