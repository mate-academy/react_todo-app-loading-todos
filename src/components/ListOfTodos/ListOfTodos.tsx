/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Actions } from '../../types/Actions';
import { filteredTodos } from '../../utils/filteredTodos';

type Props = {
  todos: Todo[];
  actions: Actions;
};
export const ListOfTodos: React.FC<Props> = ({ todos, actions }) => {
  return (
    <>
      {todos.length > 0 && (
        <section className="todoapp__main" data-cy="TodoList">
          {todos.length > 0 &&
            filteredTodos(todos, actions).map(todo => (
              <div
                data-cy="Todo"
                className={classNames('todo', {
                  completed: todo.completed,
                })}
                key={todo.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    defaultChecked={todo.completed}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being deleted or updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div
                    className="modal-background
                    has-background-white-ter"
                  />
                  <div className="loader" />
                </div>
              </div>
            ))}
        </section>
      )}
    </>
  );
};
