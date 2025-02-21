/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId?: number;
  deleteThisTodo: (todoId: number) => void;
  //onDelete: (todoId: number) => void;
  onSelect?: (todo: Todo) => void;
  setIsChecked: boolean;
};

export const TodoList = ({
  todos,
  deleteThisTodo,

  //selectedTodoId,
  //onSelect,

  //query,
  //onQueryChange = () => {},
  //setQuery = () => {},
  //handleStatusChange = () => {},
  //selectedTodoId,
  //onDelete = () => {},
  //onSelect = () => {},
}: Props) => (
  <div>
    {todos.map(todo => (
      <div
        data-cy="Todo"
        className={todo.completed ? 'todo completed' : 'todo'}
        key={todo.id}
      >
        <label htmlFor={`todo-${todo.id}`} className="todo__status-label">
          <input
            id={`todo-${todo.id}`}
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>

        {/* Remove button appears only on hover */}
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteThisTodo(todo.id)}
        >
          ×
        </button>

        {/* overlay will cover the todo while it is being deleted or updated */}
        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </div>
);
