import classNames from 'classnames';
import React, { useContext } from 'react';
import { StateContext } from './MainContext';
import { Todo } from '../types/Todo';
import { Select } from '../types/Select';

const getPreparedTodos = (todoList: Todo[], selectedTodo: string) => {
  switch (selectedTodo) {
    case Select.ACTIVE:
      return todoList.filter(todo => !todo.completed);
    case Select.COMPLETED:
      return todoList.filter(todo => todo.completed);

    default:
      return todoList;
  }
};

export const TodoList: React.FC = () => {
  const { todos, selectPage } = useContext(StateContext);

  const visibleTodos = getPreparedTodos(todos, selectPage);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map((todo: Todo) => {
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
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
