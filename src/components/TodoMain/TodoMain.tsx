import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setHasError: (error: string) => void,
};

export const TodoMain: React.FC<Props> = ({
  todos,
  setHasError,
}) => {
  return (
    <section className="todoapp__main">
      {
        todos.map(todo => (
          <div
            key={todo.id}
            className={classNames(
              'todo',
              { complited: todo.completed },
            )}
          >
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => setHasError('')}
              />
            </label>

            <span className="todo__title">{todo.title}</span>

            <button type="button" className="todo__remove">×</button>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))
      }
    </section>
  );
};
