import { FilterStatus, Todo } from '../types/Todo';
import { Filter } from './Filter';

type Props = {
  selectedTodo: Todo[];
  todoStatus: FilterStatus;
  handleFilterChange: (newTodoStatus: FilterStatus) => void;
};

export const Footer: React.FC<Props> = ({
  selectedTodo,
  todoStatus,
  handleFilterChange,
}: Props) => {
  const activeTodo = selectedTodo.filter(
    (todo: Todo) => !todo.completed,
  ).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodo} items left
      </span>

      <Filter todoStatus={todoStatus} handleFilterChange={handleFilterChange} />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={selectedTodo.every((todo: Todo) => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
