import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <div className="todo-list" data-cy="todosList">
        {todos.map(todo => (
          <div
            key={todo.id}
            data-cy="Todo"
            className={classNames('todo', {
              completed: todo.completed,
            })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))}

        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </section>
  );
};

/* export const getFilteredTodos = (todos: Todo[], status: Status): Todo[] => {
  return todos.filter(({ completed }) => {
    switch (status) {
      case Status.Active:
        return !completed;

      case Status.Completed:
        return completed;

      default:
        return true;
    }
  });
}; */
