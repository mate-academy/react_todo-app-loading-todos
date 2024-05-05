import React from "react";
import { Todo } from "../../types/Todo";
import cn from 'classnames';

interface Props {
  todos: Todo[];
  loader: boolean;
  tempId: number;
}

export const Main = ({ todos, loader, tempId }: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div data-cy="Todo" className="todo" key={todo.id}>
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>


            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className={cn('modal overlay', {'is-active': loader && todo.id === tempId})}>
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))
      ) : (
        null
      )}
    </section>
  );
}
