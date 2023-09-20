import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const Section: React.FC<Props> = ({ todos }) => {
  return (
    <section data-cy="TodoList" className="todoapp__main">
      {todos.map(todo => (
        <div data-cy="Todo" className="todo" key={todo.id}>
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">{todo.title}</span>
          <button
            data-cy="TodoDelete"
            type="button"
            className="todo__remove"
          >
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
