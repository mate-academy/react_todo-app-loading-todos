import { Todo, TodoStatus } from '../../types/Todo';
import { getFilteredTodos } from '../../utils/getFilteredTodos';
import { FilterTodos } from './FilterTodos';

type FooterProps = {
  todos: Todo[];
  status: TodoStatus;
  setStatus: (value: TodoStatus) => void;
};

export const Footer = ({ todos, status, setStatus }: FooterProps) => {
  const activeTodos = getFilteredTodos({
    todos,
    status: 'active',
  });

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* Hide the footer if there are no todos */}
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <FilterTodos status={status} setStatus={setStatus} />

      {/* this button should be disabled if there are no completed todos */}
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
