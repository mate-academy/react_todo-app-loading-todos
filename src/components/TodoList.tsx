import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (

    <>
      {todos.map(todo => {
        const { id, title, completed } = todo;

        return (
          <div
            className={classNames('todo', {
              completed,
              editing: isEditing,
            })}
            key={id}
          >
            <label
              className="todo__status-label"
              onDoubleClick={handleDoubleClick}
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

            {/* overlay will cover the todo while it is being updated */}

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

              {/* 'is-active' class puts this modal on top of the todo */}
              <div className="modal overlay is-active">
                <div
                  className="modal-background has-background-white-ter"
                />
                <div className="loader" />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
