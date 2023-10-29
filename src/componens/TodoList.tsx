import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<[] | Todo[]>>
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section
      className="todoapp__main"
      data-cy="TodoList"
    >
      {todos.map(todo => (
        <div
          data-cy="Todo"
          key={todo.id}
          className={classNames('todo', { completed: !!todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={!!todo.completed}
            />
          </label>

          <span
            data-cy="TodoTitle"
            className="todo__title"
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

          {/* 'is-active' class puts this modal on top of the todo */}
          <div
            data-cy="TodoLoader"
            className="modal overlay"
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
