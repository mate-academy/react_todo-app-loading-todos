import classNames from 'classnames';
import React from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  handleChangeStatus: (todoId: number, status: boolean) => void,
  handleDeleteTodo: (todoId: number) => void,
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  handleChangeStatus,
  handleDeleteTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        {
          completed,
        },
      )}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleChangeStatus(id, completed)}
        />
      </label>

      <span
        data-cy="TodoTitle"
        className="todo__title"
        // onDoubleClick={() => console.info(`double click${todo.title}`)}
      >
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
    </div>
  );
};
