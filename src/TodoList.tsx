/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC } from 'react';
import { Todo } from './types/Todo';
import classNames from 'classnames';

interface Props {
  todoList: Todo[];
  onSelectInputChange: (id: number, completed: boolean) => void;
  todoLoadingStates: { [key: number]: boolean };
}

export const TodoList: FC<Props> = ({
  todoList,
  onSelectInputChange,
  todoLoadingStates,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This todo is being edited
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

         This form is shown instead of the title and remove button
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>

        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    */}

      {todoList.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => onSelectInputChange(todo.id, !todo.completed)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          <div
            data-cy="TodoLoader"
            className={classNames('modal', 'overlay', {
              'is-active': todoLoadingStates[todo.id] || false,
            })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
