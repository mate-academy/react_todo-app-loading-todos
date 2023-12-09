import { TodoFilter } from './TodoFilter';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

type Props = {
  setFilter: (filter: Filter) => void;
  todos: Todo[];
  filter:Filter;
};

export const Footer: React.FC<Props> = ({ setFilter, todos, filter }) => {
  const notCompletedCount = todos.filter((el) => !el.completed).length;
  const completedCount = todos.filter((el) => el.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${notCompletedCount} ${notCompletedCount === 1 ? 'item' : 'items'} left`}
      </span>
      <TodoFilter setFilter={setFilter} filter={filter} />
      {!!completedCount && (
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
