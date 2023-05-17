import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main">
    {todos.map((todo) => {
      return (
        <div className="todo completed" key={todo.id}>
          <label className="todo__status-label">
            <input type="checkbox" className="todo__status" checked />
          </label>

          <span className="todo__title">{todo.title}</span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove">
            ×
          </button>

          {/* overlay will cover the todo while it is being updated */}
          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      );
    })}
  </section>
);
