import { FilterOptions } from '../types/FilterOptions';
import { Todo } from '../types/Todo';
import { Filter } from './Filter';

type Props = {
  todos: Todo[];
  filter: FilterOptions;
  setFilter: (filter: FilterOptions) => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, setFilter }) => {
  const itemsLeft = todos.filter(todo => !todo.completed).length;
  const isCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${itemsLeft} item${itemsLeft > 1 ? 's' : ''} left`}
      </span>

      <Filter filter={filter} setFilter={setFilter} />

      {isCompletedTodos && (
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
