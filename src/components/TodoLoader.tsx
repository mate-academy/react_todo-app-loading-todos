import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { useTodosContext } from '../Context/TodosContext';

type LoaderProps = {
  todo: Todo;
};

export const TodoLoader: React.FC<LoaderProps> = ({ todo }) => {
  const { loadingIds } = useTodosContext();

  return (
    <div
      data-cy="TodoLoader"
      className={cn('modal overlay', {
        'is-active': loadingIds.includes(todo.id),
      })}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
