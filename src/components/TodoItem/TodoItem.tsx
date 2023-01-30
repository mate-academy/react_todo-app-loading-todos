import { memo } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader/Loader';
import { Todo } from '../../types/Todo';

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

      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">{todo.title}</span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
      >
        ×
      </button>

      <Loader />
    </div>
  );
});
