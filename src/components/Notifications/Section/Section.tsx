import { deleteTodo, patchTodo } from '../../../api/todos';
import { Todo } from '../../../types';
import { ErrorType } from '../../../types';

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setError: React.Dispatch<React.SetStateAction<ErrorType>>;
  visibleTodos: Todo[];
};

export const Section: React.FC<Props> = ({
  setTodos,
  setError,
  visibleTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              aria-label={`Mark ${todo.title} as completed`}
              onChange={() => {
                patchTodo(todo.id, { completed: !todo.completed })
                  .then(updatedTodo => {
                    setTodos(prev =>
                      prev.map(t =>
                        t.id === updatedTodo.id ? updatedTodo : t,
                      ),
                    );
                  })
                  .catch(() => setError('update'));
              }}
              readOnly
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() =>
              deleteTodo(todo.id).then(() => {
                setTodos(prev => prev.filter(t => t.id !== todo.id));
              })
            }
          >
            x
          </button>

          <div data-cy="TodoLoader" className="modal overlay hidden">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
