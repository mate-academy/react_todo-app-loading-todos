import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';
import { TodoCount } from '../TodoCount';

type Props = {
  handleSetFilterTodos: (filterType: FilterType) => void;
  todos: Todo[];
};

export const Footer = ({ handleSetFilterTodos, todos }: Props) => {
  const addFilterType = (filterType: FilterType) => {
    handleSetFilterTodos(filterType);
  };

  return (
    <footer className="todoapp__footer">
      <TodoCount todos={todos} />
      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className="filter__link selected"
          onClick={() => addFilterType('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          onClick={() => addFilterType('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          onClick={() => addFilterType('completed')}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
