/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../types/Todo';
import { updateTodos } from '../api/todos';
import cn from 'classnames';

type Props = {
  todo: Todo;
  setUpdateTodoStatus: (id: number, status: boolean) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, setUpdateTodoStatus }) => {
  const settingStatus = async (id: number, newStatus: boolean) => {
    try {
      await updateTodos(id, { completed: newStatus });
      setUpdateTodoStatus(id, newStatus);
    } catch (e) {}
  };

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            settingStatus(todo.id, !todo.completed);
          }}
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
};
