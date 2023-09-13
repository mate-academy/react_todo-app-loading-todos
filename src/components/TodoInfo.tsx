import classNames from 'classnames';
import { Todo } from '../types/Todo';

type TodoInfoProps = {
  todo: Todo
};

export const TodoInfo = ({ todo: { completed, title } }: TodoInfoProps) => {
  const todoClassName = classNames('todo', { completed });

  return (
    <div className={todoClassName}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
        />
      </label>
      <span className="todo__title">{title}</span>
    </div>
  );
};
