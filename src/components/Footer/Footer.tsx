import cn from 'classnames';
import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import { Filter } from '../../types/Filter';

export const Footer = () => {
  const { todos, filterTodo, getFilteredTodo } = useContext(TodoContext);
  const activeTodos = todos.filter(({ completed }) => !completed);
  const isCompleted = todos.some(({ completed }) => completed);
  const isHidden = () => {
    if (!todos.length) {
      return false;
    }

    return true;
  };

  return (
    <>
      {isHidden() && (
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${activeTodos.length} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: filterTodo === Filter.All,
              })}
              onClick={() => getFilteredTodo(Filter.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: filterTodo === Filter.Active,
              })}
              onClick={() => getFilteredTodo(Filter.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: filterTodo === Filter.Completed,
              })}
              onClick={() => getFilteredTodo(Filter.Completed)}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className={cn('todoapp__clear-completed', {
              hidden: !isCompleted,
            })}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
