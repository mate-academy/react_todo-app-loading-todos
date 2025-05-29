import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodosFilter } from '../../types/TodosFilter';

type TodoListProps = {
  todos: Todo[];
  selectedFilter: TodosFilter;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedFilter,
}) => {
  const [updatedTodos, setUpdatedTodos] = useState<Todo | null>(null);

  const filteredTodos = todos.filter(todo => {
    if (selectedFilter === 'all') {
      return true;
    }

    if (selectedFilter === 'active') {
      return !todo.completed;
    }

    if (selectedFilter === 'completed') {
      return todo.completed;
    }

    return false;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={`todo${todo.completed ? ' completed' : ''}`}
        >
          <label className="todo__status-label">
            <input
              aria-label="Toggle todo status"
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              readOnly
            />
          </label>
          {updatedTodos && todo.id === updatedTodos.id ? (
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={updatedTodos.title}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => setUpdatedTodos(todo)}
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>
            </>
          )}

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
