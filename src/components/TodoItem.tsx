/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../types/Todo';
import { TodoLoader } from './TodoLoader';

type Props = {
  todos: Todo[];
  toggleTodo: (todo: Todo) => void;
  isLoading: boolean;
};

export const TodoItem: React.FC<Props> = ({ todos, toggleTodo, isLoading }) => {
  return (
    <>
      {todos.map(todo => (
        <div
          data-cy="Todo"
          className={`todo ${todo.completed && `completed`}`}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => toggleTodo(todo)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          <TodoLoader isLoading={isLoading} />
        </div>
      ))}
    </>
  );
};
