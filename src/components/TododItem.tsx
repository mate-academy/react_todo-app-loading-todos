/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import cn from 'classnames';
import { FilteredStatus, Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  setCount: React.Dispatch<React.SetStateAction<number>>;
  filterValue: FilteredStatus;
}

export const TodoItem = ({ todos, setCount, filterValue }: Props) => {
  useEffect(() => {
    todos.forEach(todo => {
      if (!todo.completed) {
        setCount(currentCount => currentCount + 1);
      }
    });
  }, [todos, setCount]);

  const filteredTodos = todos.filter(todo => {
    if (filterValue === FilteredStatus.ACTIVE) {
      return !todo.completed;
    }

    if (filterValue === FilteredStatus.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />
          </label>

          {todo.title ? (
            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>
          ) : (
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>
          )}

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
