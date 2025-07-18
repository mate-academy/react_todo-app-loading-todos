import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../loader/loader';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={`todo-${todo.id}`} className="todo__status-label">
        <input
          data-cy="TodoStatus"
          id={`todo-${todo.id}`}
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      {/* <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form> 
    форма появляется, когда ми хотим редактировать пост, место title и кнопки 
    */}

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <Loader />
    </div>
  );
};
