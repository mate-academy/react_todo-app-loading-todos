import classNames from 'classnames';
import React, { memo } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader/Loader';

export type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = memo(({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          data-cy="Todo"
          key={todo.id}
          className={classNames('todo', { completed: todo.completed === true })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
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

          {!todo && <Loader />}
        </div>
      ))}
    </section>
  );
});
