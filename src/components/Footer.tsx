import React from 'react';
import classNames from 'classnames';
import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';

type Props = {
  status: TodoStatus,
  setStatus: (value: TodoStatus) => void,
  todos: Todo[],
};

export const Footer: React.FC<Props> = ({ status, setStatus, todos }) => {
  const getActiveTodo = () => {
    return (
      todos.filter(todo => !todo.completed).length
    );
  };

  const getCompletedTodo = () => {
    return (
      todos.filter(todo => todo.completed).length
    );
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${getActiveTodo()} items left`}
      </span>
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === TodoStatus.All,
          })}
          onClick={() => setStatus(TodoStatus.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === TodoStatus.Active,
          })}
          onClick={() => setStatus(TodoStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === TodoStatus.Completed,
          })}
          onClick={() => setStatus(TodoStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed', {
          'todoapp__clear-completed--hidden': getCompletedTodo() < 1,
        })}

      >
        Clear completed
      </button>
    </footer>
  );
};
