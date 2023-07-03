import React from 'react';
import cn from 'classnames';
import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';

type Props = {
  setTodoFilter: (status: TodoStatus) => void;
  todoFilter: TodoStatus;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  setTodoFilter,
  todoFilter,
  todos,
}) => {
  const isButtonVisible = () => {
    return todos.some(todo => todo.completed);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: todoFilter === TodoStatus.ALL,
          })}
          onClick={() => setTodoFilter(TodoStatus.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: todoFilter === TodoStatus.ACTIVE,
          })}
          onClick={() => setTodoFilter(TodoStatus.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: todoFilter === TodoStatus.COMPLETED,
          })}
          onClick={() => setTodoFilter(TodoStatus.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {isButtonVisible() && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}

    </footer>
  );
};
