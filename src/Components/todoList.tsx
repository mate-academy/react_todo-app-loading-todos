/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  setTodos: (array: Todo[]) => void;
  removeTodo: (todo: Todo) => void;
  markCompleted: (todo: Todo) => void;
  changeTitle: (todo: Todo, title: string) => Promise<void>;
  tempTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  removeTodo,
  markCompleted,
  changeTitle,
  tempTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          markCompleted={markCompleted}
          removeTodo={removeTodo}
          changeTitle={changeTitle}
        />
      ))}
      {tempTodo && (
        <div data-cy="Todo" className="todo">
          <label className="todo__status-label">
            {/* This comment is made because it fixes
                "A form label must be associated with a control" error */}
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo.title}
          </span>
          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};
