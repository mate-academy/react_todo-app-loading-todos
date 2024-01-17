import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter';

type Props = {
  todos: Todo[];
  filterStatus: Status;
  setFilterStatus: React.Dispatch<React.SetStateAction<Status>>;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  filterStatus,
  setFilterStatus,
}) => {
  const activeItems = todos.reduce((count, todo) => {
    return count + +!todo.completed;
  }, 0);

  const countMessage = `${activeItems} item${activeItems === 1 ? '' : 's'} left`;

  const hasCompleted = !!(todos.length - activeItems);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countMessage}
      </span>
      <TodoFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {hasCompleted && (
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
