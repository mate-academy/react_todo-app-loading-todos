import { Filter } from '../Filter';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

type Props = {
  statuses: Status[];
  selectedStatusId: string;
  onStatusSelected: (value:Status) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  statuses,
  selectedStatusId,
  onStatusSelected,
  todos,
}) => {
  const activeTodos = todos.filter(({ completed }) => !completed).length;

  return (

    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos} items left`}
      </span>
      <Filter
        statuses={statuses}
        selectedStatusId={selectedStatusId}
        onStatusSelected={onStatusSelected}
      />
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
