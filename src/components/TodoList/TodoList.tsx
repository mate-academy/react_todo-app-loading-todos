/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
  toggleTodo: (todoId: number, completed: boolean) => void;
}

export const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        const { id, title, completed } = todo;
        const checkboxName = `checkbox-${id}`;

        return (
          <div
            key={id}
            data-cy="Todo"
            className={classNames('todo', { completed })}
          >
            <label className="todo__status-label" htmlFor={checkboxName}>
              <input
                data-cy="TodoStatus"
                type="checkbox"
                id={checkboxName}
                name={checkboxName}
                className="todo__status"
                checked={completed}
                onChange={() => {
                  toggleTodo(todo.id, !completed);
                }}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div data-cy="TodoLoader" className={classNames('modal overlay')}>
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
