import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filterType: string;
};

export const TodoList: React.FC<Props> = ({ todos, filterType }) => {
  const filteredTodos = todos.filter((todo) => {
    switch (filterType) {
      case 'Active':
        return todo.completed === false;

      case 'Completed':
        return todo.completed === true;

      case 'All':
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo) => {
        return (
          <div
            key={todo.id}
            data-cy="Todo"
            className={classNames(
              { todo: todo.completed === false },
              { 'todo completed': todo.completed },
            )}
          >
            <label className="todo__status-label">
              {todo.completed && (
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  defaultChecked
                />
              )}

            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
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
