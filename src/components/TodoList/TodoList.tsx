import { Todo } from '../../types/Todo';
import { TodoListProps } from '../../types/TodoListProps';

export const TodoList: React.FC<TodoListProps> = ({
  todos = [],
  isLoading,
  selectedTodoId,
  handleToggleStatus,
  handleDelete,
}) => {
  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo: Todo) => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
        >
          <p
            className="todo__status-label"
            onClick={() => handleToggleStatus(todo.id)}
          >
            <input
              id={`todo-status-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              defaultChecked={todo.completed}
            />
          </p>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>

          <div
            data-cy="TodoLoader"
            className={`modal overlay ${
              selectedTodoId === todo.id ? 'is-active' : ''
            }`}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
