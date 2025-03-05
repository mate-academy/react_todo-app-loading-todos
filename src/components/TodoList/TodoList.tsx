import { Todo } from '../../types/Todo';

type Prop = {
  filteredTodos: Todo[] | undefined;
  setActionError: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoList: React.FC<Prop> = ({ filteredTodos, setActionError }) => {
  const updateTodo = () => {
    setActionError('Unable to update Todo');
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos?.map(todo => (
        <div
          data-cy="Todo"
          key={todo.id}
          className={todo.completed ? 'todo completed' : 'todo'}
        >
          <label className="todo__status-label">
            <input
              id={`todo-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              aria-label="Mark as completed"
              onChange={() => updateTodo()}
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
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
