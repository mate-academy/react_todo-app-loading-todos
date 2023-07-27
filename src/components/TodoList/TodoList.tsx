import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <div className={classNames('todo', {
          'todo completed': todo.completed,
        })}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked
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
};

/*
<div className="todo">
  <label className="todo__status-label">
    <input
      type="checkbox"
      className="todo__status"
    />
  </label>

  <span className="todo__title">Not Completed Todo</span>
  <button type="button" className="todo__remove">×</button>

  <div className="modal overlay">
    <div className="modal-background has-background-white-ter" />
    <div className="loader" />
  </div>
</div>

<div className="todo">
  <label className="todo__status-label">
    <input
      type="checkbox"
      className="todo__status"
    />
  </label>

  <form>
    <input
      type="text"
      className="todo__title-field"
      placeholder="Empty todo will be deleted"
      value="Todo is being edited now"
    />
  </form>

  <div className="modal overlay">
    <div className="modal-background has-background-white-ter" />
    <div className="loader" />
  </div>
</div>

<div className="todo">
  <label className="todo__status-label">
    <input type="checkbox" className="todo__status" />
  </label>

  <span className="todo__title">Todo is being saved now</span>
  <button type="button" className="todo__remove">×</button>

  <div className="modal overlay is-active">
    <div className="modal-background has-background-white-ter" />
    <div className="loader" />
  </div>
</div>
*/
