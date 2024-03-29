import { FilteredTodos } from '../../enums/FilteredTodo';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter/TodoFilter';

interface TodoFooterProps {
  activeTodos: Todo[];
  completedTodos: Todo[];
  filterSelected: FilteredTodos;
  setFilterSelected: (filterSelected: FilteredTodos) => void;
}

export const TodoFooter: React.FC<TodoFooterProps> = ({
  activeTodos,
  completedTodos,
  filterSelected,
  setFilterSelected,
}) => {
  return (
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
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
