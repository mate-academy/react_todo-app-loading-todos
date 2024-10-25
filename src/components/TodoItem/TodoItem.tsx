/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC } from 'react';
import { deleteTodo, updateTodo } from '../../api/todos';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoItemProps extends Todo {}

export const TodoItem: FC<TodoItemProps> = ({ completed, id, title }) => {
  const onTodoDelete = () => {
    deleteTodo(id);
  };

  const isCompletedToggle = () => {
    updateTodo({
      id: id,
      updatedFields: {
        completed: !completed,
      },
    });
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={isCompletedToggle}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={onTodoDelete}
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
