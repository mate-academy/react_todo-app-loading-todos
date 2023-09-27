import classNames from 'classnames';
import { Todo } from '../types/Todo';
import * as postService from '../api/todos';

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<[] | Todo[]>>
}

export const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
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
            onClick={() => {
              setTodos(
                (prevTodo: Todo[]) => [...prevTodo.filter(
                  (item: Todo) => item.id !== todo.id,
                )],
              );
              postService.deleteTodos(todo.id);
            }}
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
