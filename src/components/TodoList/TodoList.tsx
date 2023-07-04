import React, { memo } from 'react';
import cN from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = memo(
  ({ todos }) => (
    <section className="todoapp__main">
      {todos.map(todo => (
        <div
          className={cN('todo', {
            completed: todo.completed,
          })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked
            />
          </label>

          <span className="todo__title">{todo.title}</span>

          <button type="button" className="todo__remove">×</button>
        </div>
      ))}

    </section>

  ),
);
