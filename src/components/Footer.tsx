import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';

import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Props = {
  setFilteredTodos: Dispatch<SetStateAction<Todo[]>>,
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
};

export const Footer: React.FC<Props> = ({
  setFilteredTodos,
  todos,
  setTodos,
}) => {
  const [filterStatus, setFilterStatus] = useState(Status.all);

  const chooseStatus = (status: Status) => {
    let filteredTodos = todos;

    switch (status) {
      case Status.activ:
        filteredTodos = todos.filter(todo => !todo.completed);
        setFilterStatus(Status.activ);
        break;

      case Status.completed:
        filteredTodos = todos.filter(todo => todo.completed);
        setFilterStatus(Status.completed);
        break;

      default:
        filteredTodos = todos;
        setFilterStatus(Status.all);
    }

    setFilteredTodos(filteredTodos);
  };

  const deleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const todoLeft = () => {
    if (todos) {
      return todos.filter((todo: Todo) => !todo.completed).length;
    }

    return [];
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todoLeft()} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterStatus === Status.all },
          )}
          onClick={() => chooseStatus(Status.all)}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterStatus === Status.activ },
          )}
          onClick={() => chooseStatus(Status.activ)}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterStatus === Status.completed },
          )}
          onClick={() => chooseStatus(Status.completed)}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {todos.find((todo: Todo) => todo.completed)
        && (
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={deleteCompleted}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
};
