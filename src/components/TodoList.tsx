import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  // onSetCompleted:(state:boolean) => void,
  onRemoveTodo: (userId: number, todoId: number) => void,
  userId:number
};

export const TodoList: React.FC<Props> = ({
  todos,
  // onSetCompleted,
  onRemoveTodo,
  userId,
}) => (
  <section className="todoapp__main">
    {todos.map((todo) => (
      <div
        key={todo.id}
        className={classNames(
          'todo',
          { completed: todo.completed },
        )}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={(() => {
              // onSetCompleted((state) => !state);
            })}
          />
        </label>

        <span className="todo__title">{todo.title}</span>

        <button
          type="button"
          className="todo__remove"
          onClick={() => {
            onRemoveTodo(userId, todo.id);
          }}
        >
          ×
        </button>
        {/* overlay will cover the todo while it is being updated */}
        <div
          className="modal overlay"
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </section>
);
