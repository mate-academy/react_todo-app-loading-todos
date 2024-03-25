import { FilterTodos } from '../../types/FilterTodos';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter';

type Props = {
  filterSelected: FilterTodos;
  setFilterSelected: (filterSelected: FilterTodos) => void;
  activeTodos: Todo[];
  completedTodos: Todo[];
};

export const Footer: React.FC<Props> = ({
  filterSelected,
  setFilterSelected,
  activeTodos,
  completedTodos,
}) => {
  return (
    <div>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {activeTodos.length} items left
        </span>
        <TodoFilter
          filterSelected={filterSelected}
          setFilterSelected={setFilterSelected}
        />

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={completedTodos.length < 1}
        >
          {FilterTodos.clearCompleted}
        </button>
      </footer>
    </div>
  );
};
