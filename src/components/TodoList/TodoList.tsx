import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => {
        return (
          <div
            className={classnames(
              'todo',
              { completed: todo.completed },
            )}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
              />
            </label>

            <span className="todo__title">{todo.title}</span>

            <button type="button" className="todo__remove">×</button>

            {todo.completed
              && (
                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              )}
          </div>
        );
      })}
    </section>
  );
};
