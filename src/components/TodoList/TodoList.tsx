import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TypeOfFiltering } from '../../types/TypeOfFiltering';

type Props = {
  todos: Todo[],
  filterType: TypeOfFiltering,
};

export const TodoList:React.FC<Props> = ({
  todos,
  filterType: typeOfFiltering,
}) => {
  const visibleColors = useMemo<Todo[]>(() => {
    return todos.filter(todo => {
      switch (typeOfFiltering) {
        case TypeOfFiltering.Active:
          return !todo.completed;

        case TypeOfFiltering.Completed:
          return todo.completed;

        case TypeOfFiltering.All:
        default:
          return todo;
      }
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
      ))}
    </section>
  );
};
