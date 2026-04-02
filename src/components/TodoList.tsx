import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

/* eslint-disable jsx-a11y/label-has-associated-control */
type Props = {
  visibleTodos: Todo[];
  tempTodo: Todo | null;
  deletingIds: number[];
  toggleTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  editingTodo: Todo | null;
  newTitle: string;
  setNewTitle: (v: string) => void;
  updateTitle: (e: React.FormEvent) => void;
  handleKeyUp: (e: React.KeyboardEvent) => void;
  handleEditClick: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  tempTodo,
  deletingIds,
  toggleTodo,
  deleteTodo,
  editingTodo,
  newTitle,
  setNewTitle,
  updateTitle,
  handleKeyUp,
  handleEditClick,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {visibleTodos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        deletingIds={deletingIds}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editingTodo={editingTodo}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        updateTitle={updateTitle}
        handleKeyUp={handleKeyUp}
        handleEditClick={handleEditClick}
      />
    ))}

    {tempTodo && (
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={false}
            readOnly
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {tempTodo.title}
        </span>

        <button className="todo__remove" disabled>
          ×
        </button>

        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    )}
  </section>
);
