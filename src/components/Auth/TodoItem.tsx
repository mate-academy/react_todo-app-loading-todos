import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  // completed: boolean;
  // id: number;
  // title: string;
  todo:Todo,
  handleEditTodo: (id: number, comleted: boolean) => Promise<void>;
  handleDeleteTodo: (id: number) => Promise<void>;
  isCompleted: boolean;
};

export const TodoItem: React.FC<Props> = ({
  // completed,
  // id,
  // title,
  todo,
  handleEditTodo,
  handleDeleteTodo,
  isCompleted,
}) => {
  const { completed, id, title } = todo;

  return (
    <div data-cy="Todo" className={cn('todo', { completed })} key={id}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={isCompleted}
          onChange={(event) => handleEditTodo(id, event.target.checked)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
        onClick={() => handleDeleteTodo(id)}
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
