import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { TodosFilter } from '../TodosFilter/TodosFilter';

type Props = {
  todos: Todo[],
  filterStatus: Status,
  setFilterStatus: (status: Status) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length === 1
          ? '1 item left'
          : `${todos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <TodosFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
