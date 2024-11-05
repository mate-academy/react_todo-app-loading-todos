import { Todo } from '../../../types/Todo';
import cn from 'classnames';

export const TodoItem = ({ todo }: { todo: Todo }) => (
  <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
    {/* eslint-disable jsx-a11y/label-has-associated-control */}
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        /* Disable error without onChange in console */
        onChange={() => {}}
      />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      {todo.title}
    </span>

    <button type="button" className="todo__remove" data-cy="TodoDelete">
      ×
    </button>

    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
