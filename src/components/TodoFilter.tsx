import { useState } from "react";
import { Todo } from "../types/Todo";
import cn from 'classnames';

type Filter = 'all' | 'active' | 'completed';

type TodoFilterProps = {
  todos: Todo[];
  onFilter: (filter: Filter) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ todos, onFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');

  const handleChangeFilter = (chosenFilter: Filter) => {
    setSelectedFilter(chosenFilter);
    onFilter(chosenFilter);
  };

  const otherTodos = todos.filter((todo) => !todo.completed).length;

  return (
      <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${otherTodos} ${otherTodos === 1 ? 'item' : 'items'} left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: selectedFilter === 'all' })}
          data-cy="FilterLinkAll"
          onClick ={() => handleChangeFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: selectedFilter === 'active' })}
          data-cy="FilterLinkActive"
          onClick ={() => handleChangeFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: selectedFilter === 'completed' as Filter})}
          data-cy="FilterLinkCompleted"
          onClick ={() => handleChangeFilter('completed' as Filter)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      {todos.filter(todo => !todo.completed).length !== 0
        && (
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        )}
    </footer>
  );
};
