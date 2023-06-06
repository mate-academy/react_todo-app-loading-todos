import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="todoapp__main">
    {todos.map((todo) => {
      const { id, title, completed } = todo;

      return (
        <div key={id} className={classNames('todo', { completed })}>
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked
              readOnly
            />

            <span className="todo__title">{title}</span>

            <button type="button" className="todo__remove">×</button>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </label>
        </div>
      );
    })}
  </section>
);
