import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterBy } from './TodoFilter';

type Props = {
  todos: Todo[];
  filterType: FilterBy;
};

export const TodoList: React.FC<Props> = ({ todos, filterType }) => {
  const filteredTodos = todos.filter(({ completed }) => {
    switch (filterType) {
      case FilterBy.Active:
        return completed === false;

      case FilterBy.Completed:
        return completed === true;

      case FilterBy.All:
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(({ id, completed, title }) => {
        return (
          <div
            key={id}
            data-cy="Todo"
            className={classNames(
              { todo: !completed },
              { 'todo completed': completed === true },
            )}
          >
            <label className="todo__status-label">
              {completed && (
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  defaultChecked
                />
              )}

            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
