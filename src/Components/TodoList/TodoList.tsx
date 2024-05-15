import { Todo } from '../../types/Todo';
import cn from 'classnames';

type TodoListProps = {
  visibleTodos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        return (
          <div
            key={todo.id}
            data-cy="Todo"
            className={cn('todo', { completed: todo.completed })}
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="todoStatus" className="todo__status-label">
              <input
                id="todoStatus"
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
        );
      })}
    </section>
  );
};
