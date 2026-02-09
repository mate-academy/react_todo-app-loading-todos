import { Todo } from '../types/Todo';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => (
  <div
    data-cy="Todo"
    className={`todo ${todo.completed ? 'completed' : ''}`}
  >
    <label>
      <input type="checkbox" checked={todo.completed} readOnly />
      <span data-cy="TodoTitle">{todo.title}</span>
    </label>
  </div>
);
