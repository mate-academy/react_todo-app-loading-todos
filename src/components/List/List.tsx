import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const List: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main">
    {todos.map(todo => (
      <div
        key={todo.id}
        className={classNames(
          'todo',
          { completed: todo.completed },
        )}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
          />
        </label>

        <span className="todo__title">
          {todo.title}
        </span>

        <button type="button" className="todo__remove">×</button>

        <div className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </section>
);
