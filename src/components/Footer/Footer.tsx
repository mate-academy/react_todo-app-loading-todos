import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filterTodos: (todoFiltered: Todo[]) => void,
  removeTodo: (id: number) => void,
};

export const Footer: React.FC<Props> = ({ todos, filterTodos, removeTodo }) => {
  const [activeFilter, setActiveFilter] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const doFilterTodos = (filteringProperty: boolean) => {
    return todos.filter(todo => todo.completed === filteringProperty);
  };

  const loadFilteringTodos = (isActive: boolean) => {
    const dataFiltered = doFilterTodos(isActive);

    if (!isActive) {
      setActiveFilter({
        all: false,
        active: true,
        completed: false,
      });
    } else {
      setActiveFilter({
        all: false,
        active: false,
        completed: true,
      });
    }

    filterTodos(dataFiltered);
  };

  const allTodo = () => {
    filterTodos(todos);
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

    todos.map((todo) => (
      todo.completed
        ? removeTodo(todo.id)
        : null
    ));

    return null;
  };

  useEffect(() => {
    if (activeFilter.active) {
      loadFilteringTodos(false);
    }

    if (activeFilter.completed) {
      loadFilteringTodos(true);
    }
  }, [todos]);

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
