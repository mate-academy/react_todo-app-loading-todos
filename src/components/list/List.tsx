import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todoList: Todo[];
  setTodoList:(todo: Todo[]) => void,
  setError:(text: string) => void,
};

export const List: React.FC<Props> = ({
  todoList,
}) => {
  return (
    <section className="todoapp__main">

      { todoList.map((todo: Todo) => (
        <div
          className={cn('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>

          <>
            <span
              className="todo__title"
            >
              {todo.title}
            </span>
            <button
              type="button"
              className="todo__remove"
            >
              ×
            </button>
          </>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
