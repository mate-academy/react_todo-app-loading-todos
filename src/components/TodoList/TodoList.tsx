import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onChangeCompleted: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({
  todos, onChangeCompleted, onDelete,
}) => (
  <section className="todoapp__main">
    {todos.map(({ title, id, completed }) => (
      <div
        className={classNames('todo', {
          completed,
        })}
        key={id}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked={completed}
            onClick={() => {
              onChangeCompleted(id, completed);
            }}
          />
        </label>

        {false
          ? (
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>
          )
          : (
            <span className="todo__title">{title}</span>
          )}

        <button
          type="button"
          className="todo__remove"
          onClick={() => {
            onDelete(id);
          }}
        >
          ×
        </button>

        <div className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </section>
);
