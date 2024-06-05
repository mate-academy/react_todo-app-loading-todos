import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  onDelete?: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onDelete = () => {} }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos &&
        todos.map(todo => (
          <div
            data-cy="Todo"
            className={cn('todo', {
              'todo completed': todo.completed,
            })}
            key={todo.id}
          >
            {/* eslint-disable jsx-a11y/label-has-associated-control */}
            <label className="todo__status-label" htmlFor={`${todo.id}`}>
              <input
                id={`${todo.id}`}
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed ? true : false}
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
              onClick={() => onDelete(todo.id)}
            >
              ×
            </button>

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))}
    </section>
  );
};
