/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
};

const TodoListComponent: React.FC<Props> = ({ todos }) => {
  const [loading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleBlurInput = () => {
    setSelectedTodo(null);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        const inputId = `todo-${todo.id}`;

        return (
          <div
            key={todo.id}
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
          >
            <label htmlFor={inputId} className="todo__status-label">
              <input
                id={inputId}
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
              />
            </label>

            {selectedTodo !== todo ? (
              <>
                <span
                  onClick={() => setSelectedTodo(todo)}
                  data-cy="TodoTitle"
                  className="todo__title"
                >
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>
              </>
            ) : (
              <form>
                <input
                  onBlur={handleBlurInput}
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={todo.title}
                />
              </form>
            )}

            <div
              data-cy="TodoLoader"
              className={classNames('modal overlay', {
                'is-active': loading,
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export const TodoList = React.memo(TodoListComponent);
