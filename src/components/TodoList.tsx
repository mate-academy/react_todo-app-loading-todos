import cn from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main">
    {todos.map((todo) => (
      <div
        className={cn('todo', {
          completed: todo.completed,
        })}
        key={todo.id}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
          />
        </label>

        <span className="todo__title">{todo.title}</span>
        <button type="button" className="todo__remove">×</button>

        <div className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </section>
);
