/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

interface Props {
  todos: Todo[] | undefined;
  isLoading: boolean;
  handleChangeStatus: (
    todoId: number | undefined,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleDeleteTodo: (id?: number) => void;
}

const TodosList: React.FC<Props> = React.memo(
  ({ todos, isLoading, handleChangeStatus, handleDeleteTodo }) => {
    if (!todos) {
      return;
    }

    return (
      <>
        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => (
            <div
              data-cy="Todo"
              className={classNames('todo', { completed: todo.completed })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={event => handleChangeStatus(todo.id, event)}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being deleted or updated */}
              {isLoading && (
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            // {/* This todo is in loadind state */}
            <div data-cy="Todo" className="todo">
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                Todo is being saved now
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* 'is-active' class puts this modal on top of the todo */}
              <div data-cy="TodoLoader" className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          )}
        </section>
      </>
    );
  },
);

TodosList.displayName = 'TodoList';
export default React.memo(TodosList);
