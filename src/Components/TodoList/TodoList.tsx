import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      <section className="todoapp__main">
        {todos.map((todo) => (
          <>
            {todo.completed ? (
              <div
                className="todo completed"
                key={todo.id}
              >
                <label className="todo__status-label">
                  <input type="checkbox" className="todo__status" checked />
                </label>

                <span className="todo__title">{todo.title}</span>

                <button type="button" className="todo__remove">
                  ×
                </button>

                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ) : (
              <div className="todo">
                <label className="todo__status-label">
                  <input type="checkbox" className="todo__status" />
                </label>

                <span className="todo__title">{todo.title}</span>
                <button type="button" className="todo__remove">
                  ×
                </button>

                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            )}
          </>
        ))}
      </section>
    </>
  );
};
