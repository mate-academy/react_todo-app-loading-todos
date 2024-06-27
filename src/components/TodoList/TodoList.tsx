/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  updateTodo: (todo: Todo) => void;
  deletTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, updateTodo, deletTodo }) => {
  const handleIsCompleted = (todo: Todo) => {
    const newTodo = { ...todo, completed: !todo.completed };

    updateTodo(newTodo);
  };

  return (
    <>
      {/* This is a completed todo */}
      {todos.map(todo => (
        <section className="todoapp__main" data-cy="TodoList" key={todo.id}>
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => handleIsCompleted(todo)}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            {/* Remove button appears only on hover */}
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deletTodo(todo)}
            >
              ×
            </button>

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>
      ))}
    </>
  );
};
