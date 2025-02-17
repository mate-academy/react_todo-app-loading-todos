/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  deleteTodo: (todoId: number) => void;
  todo: Todo;
  isLoading: boolean;
  toggleTodoCompleted: (todoId: number) => void;
  setEditingTodoId: (todoId: number | null) => void;
  setEditingTitle: (title: string) => void;
  updateTodo: (todo: Todo) => void;
  editingTodoId: number | null;
  editingTitle: string;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  deleteTodo,
  todo,
  isLoading,
  toggleTodoCompleted,
  setEditingTodoId,
  setEditingTitle,
  updateTodo,
  editingTodoId,
  editingTitle,
}) => {
  const isEditing = editingTodoId === todo.id;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodoCompleted(todo.id)}
        />
      </label>
      {isEditing ? (
        <input
          type="text"
          className="todo__title"
          value={editingTitle}
          onChange={e => setEditingTitle(e.target.value)}
          onBlur={() => {
            updateTodo({
              ...todo,
              title: editingTitle,
            });
            setEditingTodoId(null);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              updateTodo({
                ...todo,
                title: editingTitle,
              });
              setEditingTodoId(null);
            }
          }}
          autoFocus
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setEditingTodoId(todo.id);
            setEditingTitle(todo.title);
          }}
        >
          {todo.title}
        </span>
      )}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => deleteTodo(todo.id)}
      >
        ×
      </button>
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
