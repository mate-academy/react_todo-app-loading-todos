import { Todo } from '../../types/Todo';
import {
  deleteTodo,
  updateTodoCompleted,
  // updateTodoTitle,
} from '../../api/todos';

interface Props {
  todos: Todo[] | null;
  showError: (errText: string | null) => void;
}
export const Main: React.FC<Props> = ({ todos, showError }) => {
  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
    } catch {
      showError('delete');
    }
  };

  const handleUpdateTodoCompleted = async (
    id: number,
    complitedCurrVal: boolean,
  ) => {
    try {
      await updateTodoCompleted(id, {
        completed: !complitedCurrVal,
      });
    } catch {
      showError('update');
    }
  };

  return (
    <section className="todoapp__main">
      {todos ? todos.map(({
        title,
        id,
        completed,
      }) => (
        <div key={id} className="todo">
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked={completed}
              onChange={() => {
                handleUpdateTodoCompleted(
                  id,
                  completed,
                );
              }}
            />
          </label>

          <span className="todo__title">{title}</span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => {
              handleDeleteTodo(id);
            }}
          >
            ×
          </button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )) : (
        <span>Loading...</span>
      )}
    </section>
  );
};
