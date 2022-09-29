import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoLoader } from '../TodoLoader/TodoLoader';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <div
      className={classNames('todo', {
        completed: todo.completed,
      })}
      data-cy="Todo"
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
          data-cy="TodoStatus"
        />
      </label>

      <span className="todo__title" data-cy="TodoTitle">
        {todo.title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
      >
        x
      </button>

      <TodoLoader />
    </div>
  );
};
