import React from 'react';
import classNames from 'classnames';
import { TodoProps } from './TodoProps';
import { Todo } from '../../types/Todo';
import { AddableTodo } from '../AddableTodo/AddableTodo';
import { Error } from '../../Error';

export const TodoList: React.FC<TodoProps> = ({
  todos,
  updateTodoCompleted,
  setError,
  isLoading,
  todoTitle,
  selectTodo,
  selectedTodo,
  deleteTodo,
  globalLoader,
}) => {
  const handleChooseTodo = (todo: Todo) => {
    if (todo.id) {
      updateTodoCompleted(todo.id, !todo.completed);
    } else {
      setError(Error.UPDATING);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo) => {
        return (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onClick={() => {
                  handleChooseTodo(todo);
                  selectTodo(todo);
                }}
              />
            </label>

            <span
              data-cy="TodoTitle"
              className="todo__title"
            >
              {todo.title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
              onClick={() => {
                deleteTodo(todo);
              }}
            >
              ×
            </button>

            <div
              data-cy="TodoLoader"
              className={classNames(
                'modal overlay',
                { 'is-active': (todo.id === selectedTodo) || globalLoader },
              )}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
      <AddableTodo
        isLoading={isLoading}
        todoTitle={todoTitle}
      />
    </section>
  );
};
