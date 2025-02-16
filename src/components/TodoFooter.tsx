import classNames from 'classnames';
import { Filters } from '../types/Filter';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  filter: Filters;
  setFilter: (str: Filters) => void;
}

export const TodoFooter = ({ todos, filter, setFilter }: Props) => {
  const activeTodosLength = todos.filter(todo => !todo.completed).length;

  return (
    <>
      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {activeTodosLength} items left
        </span>
        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          {Object.values(Filters).map((item, i) => {
            return (
              <a
                href={item !== 'All' ? `#/${item.toLowerCase()}` : '#/'}
                className={classNames('filter__link', {
                  selected: item === filter,
                })}
                data-cy={`FilterLink${item}`}
                onClick={() => setFilter(item)}
                key={i}
              >
                {item}
              </a>
            );
          })}
        </nav>
        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={todos.length === activeTodosLength}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
