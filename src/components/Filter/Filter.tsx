import { Todo } from '../../types/Todo';
import { FilterConstant } from '../../types/FilterConstants';

type Prop = {
  todos: Todo[] | undefined;
  filter: FilterConstant;
  setFilter: React.Dispatch<React.SetStateAction<FilterConstant>>;
};

export const Filter: React.FC<Prop> = ({ todos, filter, setFilter }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos?.filter(t => t.completed === false).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'All' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => {
            setFilter(FilterConstant.All);
          }}
        >
          {FilterConstant.All}
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'Active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => {
            setFilter(FilterConstant.Active);
          }}
        >
          {FilterConstant.Active}
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'Completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            setFilter(FilterConstant.Completed);
          }}
        >
          {FilterConstant.Completed}
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos?.every(t => t.completed === false)}
      >
        Clear completed
      </button>
    </footer>
  );
};
