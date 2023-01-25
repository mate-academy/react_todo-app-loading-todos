import cn from 'classnames';
import { memo } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader/Loader';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = memo((props) => {
  const { todo } = props;

  return (
    <div
      data-cy="Todo"
      className={cn(
        'todo',
        { completed: todo.completed },
      )}
    >
      {todo
        ? (
          <>
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* eslint-disable-next-line max-len */}
            <span data-cy="TodoTitle" className="todo__title">{todo.title}</span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>
          </>
        )
        : <Loader />}
    </div>
  );
});
