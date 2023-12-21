import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter';
import { FilterType } from '../../types/FilterType';

interface Props {
  todos: Todo[];
  todosFromServer: Todo[];
  filter: FilterType;
  onFilterChange: (value: FilterType) => void;
}

export const Footer: React.FC<Props> = ({
  todosFromServer,
  filter,
  onFilterChange,
}) => {
  const completedTodos = todosFromServer.filter((todo) => todo.completed);
  const todosLeft = todosFromServer.filter((todo) => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft.length}
        {' '}
        items left
      </span>
      <TodoFilter filter={filter} onFilterChange={onFilterChange} />

      {/* don't show this button if there are no completed todos */}
      {completedTodos.length !== 0 && (
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
