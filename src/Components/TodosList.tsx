import classNames from 'classnames';
import { Todo } from '../types/Todo';

type ListOfTodos = {
  todos: Todo[],
  updateTodoStatus: (todo: Todo) => void,
  onDeleteTodo: (todo: Todo) => void,
};

export const TodosList: React.FC<ListOfTodos> = ({
  todos,
  updateTodoStatus,
  onDeleteTodo,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <div
          className={classNames(
            'todo',
            {
              completed: todo.completed,
            },
          )}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              onClick={() => updateTodoStatus(todo)}
            />
          </label>

          <span className="todo__title">{todo.title}</span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => onDeleteTodo(todo)}
          >
            ×
          </button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

      {/* This todo is being edited */}
      {/* <div className="todo">
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
          />
        </label> */}

      {/* This form is shown instead of the title and remove button */}
      {/* <form>
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
    </div> */}

      {/* This todo is in loadind state */}
      {/* <div className="todo">
        <label className="todo__status-label">
          <input type="checkbox" className="todo__status" />
        </label>

        <span className="todo__title">Todo is being saved now</span>
        <button type="button" className="todo__remove">×</button> */}

      {/* 'is-active' class puts this modal on top of the todo */}
      {/* <div className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div> */}
    </section>
  );
};
