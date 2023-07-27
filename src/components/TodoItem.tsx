import cn from 'classnames';
import { Todo } from '../types/Todo';
import { ErrorType } from '../types/Error';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setError: (value: ErrorType) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  setError, // will set in next task after editing or deleting
}) => {
  function deleteTodo() { // temporary function before deleting on server realisation
    const updatedTodo = todos.filter((td) => td.id !== todo.id);

    setTodos(updatedTodo);
  }

  function toggleComplete(id: number) {
    const updatedTodos = todos.map((td) => {
      if (td.id === id) {
        return {
          ...td,
          completed: !td.completed,
        };
      }

      return td;
    });

    setTodos(updatedTodos);
  }

  return (
    <div>
      <div
        className={cn('todo', {
          completed: todo.completed,
        })}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
        </label>
        <span className="todo__title">{todo.title}</span>

        <button type="button" className="todo__remove" onClick={deleteTodo}>
          ×
        </button>

        <div className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </div>
  );
};
