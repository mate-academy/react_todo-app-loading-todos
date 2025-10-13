/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { TodoLoader } from '../TodoLoader/TodoLoader';

type Props = {
  todos: Todo[];
  selectedTodoId?: number;
  onDelete?: (todoId: number) => void;
  onSelect?: (todo: Todo) => void;
};

export const TodosList = ({
  todos,
  selectedTodoId,
  onDelete = () => {},
  onSelect = () => {},
}: Props) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <div
        data-cy="Todo"
        key={todo.id}
        className={cn('todo', {
          completed: todo.completed,
          selected: selectedTodoId === todo.id,
        })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            readOnly
            onChange={() => onSelect(todo)}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>

        {/* Remove button appears only on hover */}
        <button
          data-cy="TodoDelete"
          type="button"
          className="todo__remove"
          onClick={() => onDelete(todo.id)}
        >
          ×
        </button>

        {/* overlay will cover the todo while it is being deleted or updated */}
        <TodoLoader todo={todo} />
      </div>
    ))}
  </section>
);
