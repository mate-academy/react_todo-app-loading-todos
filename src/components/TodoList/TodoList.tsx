/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../../types';
import cn from 'classnames';

export type Props = {
  filteredTodos: Todo[];
  handleOnCheckTodo: (id: number) => void;
  isLoading: boolean;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  handleOnCheckTodo,
  isLoading,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo: Todo) => {
        return (
          <div
            key={todo.id}
            data-cy="Todo"
            className={cn('todo', { completed: todo.completed })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => handleOnCheckTodo(todo.id)}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              {isLoading && <div className="loader" />}
            </div>
          </div>
        );
      })}
    </section>
  );
};
