import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  todos: Todo[],
  filter: (filter: Filter) => void
  removeCompletedTodos: () => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  removeCompletedTodos: removeAll,
}) => {
  const [activeFilter, setActiveFilter] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const loadFilteringTodos = (isActive: boolean) => {
    if (!isActive) {
      filter('active');
      setActiveFilter({
        all: false,
        active: true,
        completed: false,
      });
    } else {
      filter('completed');
      setActiveFilter({
        all: false,
        active: false,
        completed: true,
      });
    }
  };

  const allTodo = () => {
    filter('all');
    setActiveFilter({
      all: true,
      active: false,
      completed: false,
    });
  };

  const isCompletedTodos = todos.some(todo => todo.completed);
  const todosLeft = todos.length - todos.filter(item => item.completed).length;
  const removeCompletedTodos = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeAll();

    return null;
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosLeft} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={
            classNames('filter__link', { selected: activeFilter.all })
          }
          onClick={() => allTodo()}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            classNames('filter__link', { selected: activeFilter.active })
          }
          onClick={() => loadFilteringTodos(false)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            classNames(
              'filter__link', { selected: activeFilter.completed },
            )
          }
          onClick={() => loadFilteringTodos(true)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      {isCompletedTodos && (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={(event) => removeCompletedTodos(event)}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
