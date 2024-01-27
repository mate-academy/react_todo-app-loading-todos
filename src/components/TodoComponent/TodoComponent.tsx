import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoComponent: React.FC<Props> = ({ todo }) => {
  const { completed, title } = todo;

  return (
    <ul className="todoapp__main" data-cy="TodoList">
      <li
        data-cy="Todo"
        className={classNames('todo', { completed })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {title}
        </span>
        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>

        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </li>
    </ul>
  );
};
