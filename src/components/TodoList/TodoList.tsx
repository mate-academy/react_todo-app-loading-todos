import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <>
      {
        todos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <div
              key={id}
              className={classNames('todo', { completed, editing: isEditing })}
            >
              <label
                onDoubleClick={handleEditing}
                className="todo__status-label"
                htmlFor={`toggle-view-${id}`}
              >
                <input
                  type="checkbox"
                  className="todo__status"
                  id={`toggle-view-${id}`}
                  checked={checked}
                  onClick={handleChecked}
                />
              </label>

              <span className="todo__title">{title}</span>

              <button type="button" className="todo__remove">×</button>

              <div className="modal overlay">
                <div
                  className="modal-background has-background-white-ter"
                />
                <div className="loader" />
              </div>

              <div className="todo">
                <label className="todo__status-label">
                  <input type="checkbox" className="todo__status" />
                </label>

                <span className="todo__title">
                  Todo is being saved now
                </span>
                <button type="button" className="todo__remove">×</button>

                <div className="modal overlay is-active">
                  <div
                    className="modal-background has-background-white-ter"
                  />
                  <div className="loader" />
                </div>
              </div>
            </div>
          );
        })
      }
    </>
  );
};
