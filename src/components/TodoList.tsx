/* eslint-disable */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  visibleTodos: Todo[],
}

export const TodoList = ({ visibleTodos }: Props) => {
  if (visibleTodos.length < 1) return;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map((todo: Todo) => {
        return (
          <div
            key={todo.id}
            data-cy="Todo"
            className={classNames(
              'todo',
              { 'completed': todo.completed }
            )}

          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                defaultChecked
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

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        )
      })}
    </section>
  );
};
