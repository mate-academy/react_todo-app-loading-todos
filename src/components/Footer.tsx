import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  onSetFilter: (filter: string) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  onSetFilter,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${todos.filter((todo) => !todo.completed).length} items left`}
    </span>

    {/* Active filter should have a 'selected' class */}
    <nav className="filter">
      <a
        href="#/"
        className="filter__link selected"
        onClick={() => {
          onSetFilter('all');
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className="filter__link"
        onClick={() => {
          onSetFilter('active');
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className="filter__link"
        onClick={() => {
          onSetFilter('completed');
        }}
      >
        Completed
      </a>
    </nav>

    {/* don't show this button if there are no completed todos */}
    <button
      type="button"
      className="todoapp__clear-completed"
    >
      Clear completed
    </button>
  </footer>
);
