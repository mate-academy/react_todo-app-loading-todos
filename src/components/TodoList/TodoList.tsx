import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  handleMarkChange: (id: number, isCompleted: boolean) => void,
  handleDeleteTodoClick: (id: number) => void,
};

export const TodoList: React.FC<Props> = React.memo(

  ({
    todos,
    handleMarkChange,
    handleDeleteTodoClick,
  }) => {
    return (
      <>
        {todos.map(todo => (
          <div
            key={todo.id}
            data-cy="Todo"
            className={classNames(
              'todo',
              { completed: todo.completed },
            )}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={
                  () => handleMarkChange(todo.id, todo.completed)
                }
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
              onClick={() => handleDeleteTodoClick(todo.id)}
            >
              ×
            </button>

            <div
              data-cy="TodoLoader"
              className={classNames(
                'modal overlay',
                { 'is-active': false },
              )}

            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))}
      </>
    );
  },
);
