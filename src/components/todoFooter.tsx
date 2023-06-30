import React from 'react';
import cn from 'classnames';
import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';

type Props = {
  setTodoStatus: (status: TodoStatus) => void;
  todoStatus: TodoStatus;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  setTodoStatus,
  todoStatus,
  todos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: todoStatus === TodoStatus.ALL,
          })}
          onClick={() => setTodoStatus(TodoStatus.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: todoStatus === TodoStatus.ACTIVE,
          })}
          onClick={() => setTodoStatus(TodoStatus.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: todoStatus === TodoStatus.COMPLETED,
          })}
          onClick={() => setTodoStatus(TodoStatus.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {todos.some(todo => todo.completed === true) && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}

    </footer>
  );
};
