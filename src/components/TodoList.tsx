import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  isLoading: boolean;
  loadingTodosIds: number[];
  editingTodoId: number | null;
  editingTitle: string;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onStartEditing: (todo: Todo) => void;
  onEditChange: (value: string) => void;
  onSaveEdit: (id: number) => void;
  onCancelEdit: () => void;
  onEditKeyPress: (event: React.KeyboardEvent, id: number) => void;
  tempTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  isLoading,
  loadingTodosIds,
  editingTodoId,
  editingTitle,
  onToggle,
  onDelete,
  onStartEditing,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onEditKeyPress,
  tempTodo,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {isLoading && todos.length === 0 && (
      <div data-cy="TodoLoader" className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    )}

    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        isEditing={editingTodoId === todo.id}
        editingTitle={editingTitle}
        isLoading={loadingTodosIds.includes(todo.id)}
        onToggle={onToggle}
        onDelete={onDelete}
        onStartEditing={onStartEditing}
        onEditChange={onEditChange}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
        onEditKeyPress={onEditKeyPress}
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
            disabled
          />
        </label>
        <span data-cy="TodoTitle" className="todo__title">
          {tempTodo.title}
        </span>
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          disabled
        >
          x
        </button>
        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    )}
  </section>
);
