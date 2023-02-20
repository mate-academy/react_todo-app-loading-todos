import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => {
        const {
          title,
          completed,
        } = todo;

        return (
          <div className={cn('todo', { completed: completed === true })}>
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked={completed}
              />
            </label>

            <span className="todo__title">{title}</span>
            <button type="button" className="todo__remove">×</button>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
