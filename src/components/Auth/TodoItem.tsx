import React, { useMemo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  // completed: boolean;
  // id: number;
  // title: string;
  todo: Todo;
  handleEditTodo: (id: number, comleted: boolean) => Promise<void>;
  handleDeleteTodo: (id: number) => Promise<void>;
  isCompleted: boolean;
  isAdding: boolean;
  isLoading: number[];
};

export const TodoItem: React.FC<Props> = ({
  // completed,
  // id,
  // title,
  todo,
  handleEditTodo,
  handleDeleteTodo,
  isCompleted,
  isAdding,
  isLoading,
}) => {
  const { completed, id, title } = todo;
  const isLoadingFinished = useMemo(() => (
    isLoading.includes(id) || (isAdding && !todo.id)), [isLoading, isAdding]);

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
      {isLoadingFinished && (
        <div
          data-cy="TodoLoader"
          className={cn('modal overlay', { 'is-active': isLoadingFinished })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
      {/* <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div> */}
    </div>
  );
};
