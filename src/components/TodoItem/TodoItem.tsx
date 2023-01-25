import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: FC<Props> = ({ todo }) => {
  return (
    <div
      data-cy="Todo"
      className={cn(
        'todo',
        {
          completed: todo.completed,
        },
      )}
    >
      <label className="todo__status-label">
        {todo.completed
          ? (
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked
            />
          )
          : (
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          )}
      </label>

      <span data-cy="TodoTitle" className="todo__title">{todo.title}</span>

      {/* while editing todo, after removing of title  */}
      {/* <form>
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          defaultValue="JS"
        />
      </form> */}

      {/* hide button while editing todo, after removing of title  */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={cn(
          'modal overlay',
          {
            'is-active': !todo.completed,
          },
        )}
      >
        <div className="modal-background has-background-white-ter" />

        <div className="loader" />
      </div>
    </div>
  );
};
