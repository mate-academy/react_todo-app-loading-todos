import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { TodoFilter } from './TodoFilter';

type Props = {
  status: Status;
  onChangeStatus: React.Dispatch<React.SetStateAction<Status>>;
  activeTodos: Todo[];
};

export const Footer: React.FC<Props> = ({
  status,
  onChangeStatus,
  activeTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <TodoFilter status={status} onChangeStatus={onChangeStatus} />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
