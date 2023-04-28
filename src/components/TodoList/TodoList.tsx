import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TypeFilterin } from '../../types/FilterTypes';

type Props = {
  todos: Todo[],
  typeOfFiltering: TypeFilterin,
};

export const TodoList:React.FC<Props> = ({ todos, typeOfFiltering }) => {
  const visibleColors = useMemo<Todo[]>(() => {
    return todos.filter(todo => {
      if (typeOfFiltering === TypeFilterin.Active) {
        return !todo.completed;
      }

      if (typeOfFiltering === TypeFilterin.Completed) {
        return todo.completed;
      }

      return todo;
    });
  }, [todos, typeOfFiltering]);

  return (
    <section className="todoapp__main">
      {visibleColors.map((todo:Todo) => (
        <div
          key={todo.id}
          className={
            classNames('todo', { completed: todo.completed })
          }
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              name="complete"
              id={todo.id.toString()}
            />
          </label>

          <span className="todo__title">{todo.title}</span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being updated */}
          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
