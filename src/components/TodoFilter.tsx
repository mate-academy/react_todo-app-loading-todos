import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type Props = {
  todos: Todo[],
  setTodos: (todo: Todo[]) => void,
  allTodos: Todo[],
};

export const TodosFilter: React.FC<Props> = ({ todos, setTodos, allTodos }) => {
  const [filterBy, setFilterBy] = useState<Status>(Status.All);

  const filteredTodos = async (filter: Status) => {
    let filtered: Todo[] = [];

    switch (filter) {
      case Status.All:
        filtered = allTodos;
        break;

      case Status.Completed:
        filtered = allTodos.filter(todo => todo.completed);
        break;

      case Status.Active:
        filtered = allTodos.filter(todo => !todo.completed);
        break;

      default:
        break;
    }

    setTodos(filtered);
  };

  const countCompleted = todos.filter(todo => todo.completed).length;

  const countNotCompleted = todos.filter(todo => !todo.completed).length;

  const handleSetFilteredTodos = (filter: Status) => {
    setFilterBy(filter);
    filteredTodos(filter);
  };

  return (
    <footer className="todoapp__footer">
      {todos.length > 0 && (
        <>
          <span className="todo-count">
            {`${countNotCompleted} items left`}
          </span>

          <nav className="filter">
            <a
              href="#/"
              className={classNames('filter__link',
                { selected: (filterBy === Status.All) })}
              onClick={() => handleSetFilteredTodos(Status.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className="filter__link"
              onClick={() => handleSetFilteredTodos(Status.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className="filter__link"
              onClick={() => handleSetFilteredTodos(Status.Completed)}
            >
              Completed
            </a>

          </nav>

          {countCompleted && (
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          )}
        </>
      )}
    </footer>
  );
};
