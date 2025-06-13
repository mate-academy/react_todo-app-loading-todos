import React from 'react';
import { Todo } from '../../types/Todo';
import { DeleteTodo } from '../../utils/DeleteTodo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  handleTodoDeleted: (todoId: number) => void;
  handleToggleCompleted: (todo: Todo) => void;
  isLoading: boolean;
};

export const Body: React.FC<Props> = ({
  todos,
  handleTodoDeleted,
  isLoading,
  handleToggleCompleted,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', { 'todo completed': todo.completed })}
          key={todo.id}
        >
          <label
            className="todo__status-label"
            htmlFor={`TodoStatus-${todo.id}`}
          >
            <input
              aria-label="TodoStatus"
              id={`TodoStatus-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo)}
              disabled={isLoading}
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <DeleteTodo
            currentTodoId={todo.id}
            handleTodoDeleted={handleTodoDeleted}
            isLoading={isLoading}
          />
          <div data-cy="TodoLoader" className={isLoading ? 'is-active' : ''} />
        </div>
      ))}
      {isLoading && todos.length === 0 && (
        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </section>
  );
};
