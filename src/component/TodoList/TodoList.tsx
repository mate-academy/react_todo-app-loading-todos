import { Todo } from '../../types/Todo';

type Props = {
  list: Todo[];
};

export const ToDoList: React.FC<Props> = ({ list }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {list.map(todo => (
        <div
          data-cy="Todo"
          className={`todo ${todo.completed && 'completed'}`}
          key={todo.id}
        >
          {/* eslint-disable jsx-a11y/label-has-associated-control  */}
          <label className="todo__status-label" htmlFor={'' + todo.id}>
            <input
              id={'' + todo.id}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed ? true : false}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
