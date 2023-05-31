import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface TodoFieldProps {
  todo: Todo
}

export const TodoField = ({ todo }: TodoFieldProps) => {
  const { completed, title } = todo;

  return (
    <>
      <div className={classNames('todo', {
        completed,
      })}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked
          />
        </label>
        <span className="todo__title">{title}</span>
        <button type="button" className="todo__remove">×</button>
      </div>
    </>
  );
};
