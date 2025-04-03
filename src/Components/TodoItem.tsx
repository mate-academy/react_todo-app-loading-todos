/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { ErrorMessageToShow, Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  loadingTodoIds: number[] | null;
  setLoadingTodoIds: (value: number[] | null) => void;
  loadingAllTodos: boolean;
  setErrorMessage: (value: string) => void;
  todos: Todo[];
  updateTodo: (updatedTodo: Todo) => Promise<void>;
  editingTitle: string;
  setEditingTitle: (value: string) => void;
  editingTodoId: number | null;
  setEditingTodoId: (value: number | null) => void;
  deleteTodo: (todoId: number) => Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = React.memo(
  ({
    todo: { id, title, completed },
    todo,
    loadingTodoIds,
    loadingAllTodos,
    setErrorMessage,
    todos,
    updateTodo,
    editingTitle,
    setEditingTitle,
    editingTodoId,
    setEditingTodoId,
    deleteTodo,
  }) => {
    const handleChangeTodoCompleted = (todoId: number) => {
      const todoToUpdate = todos.find((item: Todo) => item.id === todoId);

      if (!todoToUpdate) {
        return;
      }

      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };

      updateTodo(updatedTodo).catch(() => {
        setErrorMessage(ErrorMessageToShow.Update);
      });
    };

    function handleEdit(
      currentTodo: Todo,
      event?: React.ChangeEvent<HTMLInputElement>,
    ) {
      if (!event) {
        setEditingTitle(currentTodo.title);
        setEditingTodoId(currentTodo.id);

        return;
      }

      if (event.type === 'change') {
        setEditingTitle(event.target.value);

        return;
      }

      if (event.type === 'blur' || ('key' in event && event.key === 'Enter')) {
        const trimmedTitle = editingTitle.trim();

        if (trimmedTitle === currentTodo.title) {
          setEditingTodoId(null);

          return;
        }

        if (trimmedTitle) {
          const updatedTodo = { ...currentTodo, title: trimmedTitle };

          updateTodo(updatedTodo)
            .then(() => {
              setEditingTodoId(null);
            })
            .catch(() => {
              setErrorMessage(ErrorMessageToShow.Update);
            });
        } else {
          deleteTodo(currentTodo.id)
            .then(() => {
              setEditingTodoId(null);
            })
            .catch(() => {
              setErrorMessage(ErrorMessageToShow.Delete);
            });
        }
      }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.key === 'Enter') {
        event.currentTarget.blur();
      } else if (event.key === 'Escape') {
        setEditingTodoId(null);
      }
    }

    return (
      <div
        key={id}
        data-cy="Todo"
        className={`todo ${completed && 'completed'}`}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={() => handleChangeTodoCompleted(id)}
          />
        </label>

        {editingTodoId === id ? (
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={event => handleEdit(todo, event)}
            onBlur={event => handleEdit(todo, event)}
            onKeyDown={event => handleKeyDown(event)}
            autoFocus
          />
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => handleEdit(todo)}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(id)}
            >
              x
            </button>
          </>
        )}

        <div
          data-cy="TodoLoader"
          className={`modal overlay ${loadingTodoIds?.includes(id) || loadingAllTodos ? 'is-active' : ''}`}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    );
  },
);

TodoItem.displayName = 'TodoItem';
