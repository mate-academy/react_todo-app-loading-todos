import { useMemo } from "react";
import { useTodosContext } from "../../context/TodosProvider";
import cn from 'classnames';

export const Footer = () => {
  const { todos, filter, handleFilterChange } = useTodosContext();
  const activeTodos = useMemo(() => {
    let todosCopy = [...todos]
    return todosCopy.filter(todo => !todo.completed)

  },[todos]);
  const completedTodos = useMemo(() => {
    let todosCopy = [...todos]
    return todosCopy.filter(todo => todo.completed)

  }, [todos]);
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter==='All' })}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === 'Active' })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: filter === 'Completed' })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {!!completedTodos.length && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  )
}