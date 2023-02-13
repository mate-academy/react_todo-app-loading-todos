import cn from 'classnames';
import { Todo } from '../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  onTodos: Todo[]
  onDeleteTodo: (value: number) => void
  onUpdateTodo: (value: Todo) => void
};
export const Main: React.FC<Props> = ({
  onTodos,
  onDeleteTodo, onUpdateTodo,
}) => {
  return (
    <section className="todoapp__main">

      {onTodos.map(todo => (
        <div
          key={todo.id}
          className={cn(
            'todo',
            { completed: todo.completed },
          )}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => onUpdateTodo({
                ...todo,
                completed: !todo.completed,
              })}

            />
          </label>

          <span className="todo__title">{todo.title}</span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => onDeleteTodo(todo.id)}
          >
            ×
          </button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>

      ))}

    </section>

  );
};
