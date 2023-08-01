import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter/TodoFilter';

type Props = {
  completedTodos: Todo[],
  notCompletedTodos: Todo[],
  sortField: Status,
  setSortField: (status: Status) => void,
};

export const Footer: React.FC<Props> = ({
  completedTodos,
  notCompletedTodos,
  sortField,
  setSortField,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${notCompletedTodos.length} items left`}
    </span>

    <TodoFilter
      sortField={sortField}
      setSortField={setSortField}
    />

    {completedTodos.length > 0
      && (
        <button
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
  </footer>
);
