import { useCallback } from 'react';
import { TodoInterface } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todos: TodoInterface[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  fiter: string;
}

export const FilteredTodoList: React.FC<Props> = ({
  todos,
  setFilter,
  fiter,
}) => {
  const countNotCompletedItem = useCallback(() => {
    const filter = todos.filter(todo => !todo.completed);

    return filter.length;
  }, [todos]);

  const notCompletedItem = countNotCompletedItem();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${notCompletedItem} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: fiter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => {
            setFilter('all');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: fiter === 'active' })}
          data-cy="FilterLinkActive"
          onClick={() => {
            setFilter('active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: fiter === 'completed' })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            setFilter('completed');
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {todos.length - notCompletedItem !== 0 && (
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
