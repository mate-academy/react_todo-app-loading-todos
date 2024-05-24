/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos?.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          {/* This form is shown instead of the title and remove button */}
          {/* <form>
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
          </div> */}

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>

          {/* 'is-active' class puts this modal on top of the todo */}
          {/* <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div> */}
        </div>
      ))}
    </section>
  );
};
