/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from '../context/TodoContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    loadingIds,
    editingId,
    setEditingId,
    editTodoTitle,
    setEditTodoTitle,
    handleEditingTodo,
    handleEditFormSubmission,
    handleDeleteTodo,
    handleTodoToggle,
  } = React.useContext(TodoContext);

  const isEditing = editingId === todo.id;
  const isLoading = loadingIds.includes(todo.id);

  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''}`}
      onDoubleClick={() => {
        setEditingId(todo.id);
        setEditTodoTitle(todo.title);
      }}
    >
      <label className="todo__status-label" htmlFor={`todo-status-${todo.id}`}>
        <input
          id={`todo-status-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => handleTodoToggle(todo)}
          checked={todo.completed}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleEditFormSubmission(todo);
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            autoFocus
            value={editTodoTitle}
            onChange={handleEditingTodo}
            onBlur={() => handleEditFormSubmission(todo)}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setEditingId(null);
              }
            }}
            placeholder="Empty todo will be deleted"
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${isLoading ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
