import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  isEditing: boolean;
  isLoading: boolean;
};

export const TodoItem:React.FC<Props> = ({
  todo,
  isEditing,
  isLoading,
}) => (
  <div
    className={classNames('todo', { completed: todo.completed })}
    key={todo.id}
  >
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
        value={todo.title}
        checked={todo.completed}
      />
    </label>

    {isEditing ? (
      <form>
        <input
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value="Todo is being edited now"
        />
      </form>
    ) : (
      <>
        <span className="todo__title">{todo.title}</span>
        <button type="button" className="todo__remove">
          ×
        </button>
      </>
    )}

    <div className={classNames('modal overlay',
      { 'is-active': !isLoading })}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
