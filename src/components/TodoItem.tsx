/* eslint-disable quote-props */
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoItem: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <>
          <div className={cn('todo', { 'completed': todo.completed })}>
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>
            <span className="todo__title">{todo.title}</span>
          </div>

          <button type="button" className="todo__remove">×</button>

          {!todo.title && (
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                defaultValue="Todo is being edited now"
              />
            </form>
          )}

          {/* overlay will cover the todo while it is being updated
          <div className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div> */}
        </>
      ))}
    </section>
  );
};
