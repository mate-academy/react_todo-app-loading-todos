import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from './Loader';

type Props = {
  preaperedTodo: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(({ preaperedTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {preaperedTodo.map(todo => (
        <div
          data-cy="Todo"
          key={todo.id}
          className={cn('todo',
            { completed: todo.completed === true })}
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

          {!todo && <Loader />}
        </div>
      ))}
    </section>
  );
});
