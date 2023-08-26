import React, { useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodos: (a: Todo[]) => void;
  allTodos: Todo[];
};

export const TodosFilter: React.FC<Props> = ({ todos, setTodos, allTodos }) => {
  enum Status {
    all = 'all',
    active = 'active',
    completed = 'Completed',
  }

  const [filterBy, setFilterBy] = useState<Status>(Status.all);

  const getFilteredTodos = async (filter: Status) => {
    let filteredTodos: Todo[] = [];

    switch (filter) {
      case Status.active:
        filteredTodos = allTodos.filter(todo => !todo.completed);
        break;
      case Status.completed:
        filteredTodos = allTodos.filter(todo => todo.completed);
        break;
      default:
        filteredTodos = allTodos;
        break;
    }

    setTodos(filteredTodos);
  };

  const handleSetFilteredTodos = (filter: Status) => {
    setFilterBy(filter);
    getFilteredTodos(filter);
  };

  const completedTodos
    = todos.filter(todo => todo.completed).length;

  const uncompletedTodos
    = todos.filter(todo => !todo.completed).length;

  return (
    (todos.length > 0) ? (
      <>
        <span className="todo-count">
          {`${uncompletedTodos} items left`}
        </span>
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: (filterBy === Status.all),
          })}
          onClick={() => handleSetFilteredTodos(Status.all)}
        >
          All
        </a>

        <a
          href="#/completed"
          className="filter__link"
          onClick={() => handleSetFilteredTodos(Status.completed)}
        >
          Completed
        </a>

        <a
          href="#/active"
          className="filter__link"
          onClick={() => handleSetFilteredTodos(Status.active)}
        >
          Active
        </a>

        {
          completedTodos && (
            <button
              type="button"
              className="clear-completed"
            >
              Clear completed
            </button>
          )
        }
      </>
    ) : null
  );
};
