import classNames from 'classnames';
import { TodoType } from '../App';

type Props = {
  completedTodosCount: number;
  todosType: TodoType;
  setTodosType: (todosType: TodoType) => void;
  clearCompletedTodo: () => void;
};

export const Footer: React.FC<Props> = ({
  completedTodosCount,
  todosType,
  setTodosType,
  clearCompletedTodo,
}) => (
  <>
    <span className="todo-count" data-cy="TodosCounter">
      {completedTodosCount} items left
    </span>

    {/* Active link should have the 'selected' class */}
    <nav className="filter" data-cy="Filter">
      {Object.values(TodoType).map(type => {
        return (
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: todosType === type,
            })}
            data-cy={`FilterLink${type}`}
            key={type}
            onClick={() => setTodosType(type)}
          >
            {type}
          </a>
        );
      })}
    </nav>

    {/* this button should be disabled if there are no completed todos */}
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      onClick={clearCompletedTodo}
    >
      Clear completed
    </button>
  </>
);
