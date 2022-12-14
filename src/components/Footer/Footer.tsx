import { Filter } from '../Filter';
import { Todo } from '../../types/Todo';

type Props = {
  status: string,
  setStatus: (status: string) => void,
  todos: Todo[],
};

export const Footer: React.FC<Props> = ({ status, setStatus, todos }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <Filter status={status} setStatus={setStatus} />

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
