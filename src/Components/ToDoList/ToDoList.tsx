import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
// import { ToDoItem } from '../ToDoItem/ToDoItem';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos }) => {
    return (
      <section className="todoapp__main">
        {todos.map(({ id, completed, title }) => {
          return (
            <div
              key={id}
              className={classNames(
                'todo',
                { completed },
              )}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked
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
  },
);
