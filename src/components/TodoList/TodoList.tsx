import { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import { AppTodoContext } from '../AppTodoContext/AppTodoContext';

export const TodoList: FC = () => {
  const { todos } = useContext(AppTodoContext);

  return (
    <section className="todoapp__main">
      {todos.map(todo => {
        const { title, completed, id } = todo;

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
              />
            </label>

            <span className="todo__title">{title}</span>

            <button
              type="button"
              className="todo__remove"
            >
              ×
            </button>

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
