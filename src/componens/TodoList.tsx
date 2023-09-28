import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<[] | Todo[]>>
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={classNames('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"

            />
          </label>

          <span className="todo__title">{todo.title}</span>
          <button
            type="button"
            className="todo__remove"
          >
            ×
          </button>

          {/* 'is-active' class puts this modal on top of the todo */}
          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
