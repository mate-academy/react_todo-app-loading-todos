/* eslint-disable */
import React from 'react';
import { Button } from './Button';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoElement: React.FC<Props> = ({ todo }) => {
  return (
    <>
      {/* This is a completed todo */}
      <div
        data-cy="Todo"
        className={todo.completed ? 'todo completed' : 'todo'}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>

        {/* Remove button appears only on hover */}
        <Button
          type="button"
          className="todo__remove"
          dataCy="TodoDelete"
          onClick={() => {}}
        >
          ×
        </Button>
        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </>
  );
};

// todo could be "completed"
