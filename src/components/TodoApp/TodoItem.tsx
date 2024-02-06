import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../Context/StateContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { id, title, completed } = todo;
  const [modalIsActive, setModalIsActive] = useState(false);

  const handlerChageComleted = () => {
    dispatch({
      type: 'markCompleted',
      iD: id,
    });

    setModalIsActive(true);
    setTimeout(() => setModalIsActive(false), 300);
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handlerChageComleted}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': modalIsActive,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
