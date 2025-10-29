/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type TodoListProps = {
  todos?: Todo[];
  onCompletedChange: (todoId: number) => void;
};
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onCompletedChange,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos?.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
            <input
              id={`todo-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => onCompletedChange(todo.id)}
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
    </section>
  );
};
