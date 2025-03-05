import { Todo } from '../types/Todo';
import classNames from 'classnames';
import * as todosService from '../api/todos';
import { Status } from '../types/Status';
type Props = {
  onFilter: (filter: string) => void;
  onError: () => void;
  onTodos: () => void;
  todos: Todo[];
  filter: string;
};

export const Footer: React.FC<Props> = ({
  onFilter,
  onError,
  onTodos,
  todos,
  filter,
}) => {
  function clearCompleted() {
    todos.map(todo => {
      if (todo.completed) {
        todosService
          .deleteTodo(todo.id)
          .catch(() => onError('Unable to delete todo'));
      }
    });
    onTodos(todos.filter(todo => !todo.completed));
  }

const itemsLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer
      className={classNames('todoapp__footer', {
        hidden: todos.length === 0,
      })}
      data-cy="Footer"
    >
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map((status, index) => {
          const isActive = filter === status;
          const filteLabel = Object.keys(Status).find(
            k => Status[k] === status,
          );

          return (
            <a
              key={index}
              href="#/"
              className={classNames('filter__link', {
                selected: isActive,
              })}
              data-cy={`FilterLink${filteLabel}`}
              onClick={() => onFilter(status)}
            >
              {filteLabel}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
