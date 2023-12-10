import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type TodoListProps = {
  todos: Todo[],
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const [isLoaderShow, setIsLoaderShow] = useState(true);

  useEffect(() => {
    setIsLoaderShow(false);

    if (todos.length) {
      setIsLoaderShow(true);
    }
  }, [todos]);

  const handleTodoStatusChange = () => {};

  return (
    <>
      {!!todos && (
        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => {
            const { id, title, completed } = todo;

            return (
              <div
                data-cy="Todo"
                className={classNames('todo', {
                  completed,
                })}
                key={id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
                    onChange={handleTodoStatusChange}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {isLoaderShow && (
                  <div data-cy="TodoLoader" className="modal overlay">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};
