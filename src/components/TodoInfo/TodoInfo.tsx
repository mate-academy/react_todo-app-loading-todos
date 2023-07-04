import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo
}

export const TodoInfo: FC<Props> = ({ todo: { completed, title } }) => (
  <div className={cn('todo', { completed })}>
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
        checked={completed}
      />
    </label>

    <span className="todo__title">{title}</span>

    <button type="button" className="todo__remove">×</button>

    <div className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
