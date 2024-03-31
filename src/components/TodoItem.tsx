/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { deleteTodos, editTodos } from '../api/todos';
import { useTodosContext } from './useTodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    list,
    setList,
    editingTodo,
    setEditingTodo,
    handleError,
    setLoadingTodosIds,
    setErrorMessage,
    loadingTodosIds,
  } = useTodosContext();

  const handleCheckbox = (checkedTodo: Todo) => {
    const updatedList = list.map((item: Todo) => {
      if (item.id === checkedTodo.id) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    setList(updatedList);
  };

  const handleTodoDelete = useCallback(
    (todoId: number) => {
      deleteTodos(todoId)
        .then(() => {
          setList(currentTodos => {
            return currentTodos.filter(
              currentTodo => currentTodo.id !== todoId,
            );
          });
          setLoadingTodosIds([]);
        })
        .catch(() => {
          setErrorMessage('Unable to delete a todo');
          setLoadingTodosIds([]);
        });

      setLoadingTodosIds([todoId]);
    },
    [setErrorMessage, setList, setLoadingTodosIds],
  );

  const handleTodoUpdate = useCallback(
    (updatedTodo: Todo) => {
      if (!updatedTodo.title.trim()) {
        handleTodoDelete(updatedTodo.id);
        handleError('Unable to add a todo');

        return;
      }

      editTodos(updatedTodo)
        .then(() => {
          setList(currentTodos =>
            currentTodos.map(currentTodo =>
              currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
            ),
          );
          setEditingTodo(null);
        })
        .catch(() => handleError('Unable to update a todo'));
    },
    [handleTodoDelete, setEditingTodo, handleError, setList],
  );

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        'todo completed': todo.completed,
        editing: editingTodo?.id === todo.id,
      })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleCheckbox(todo)}
        />
      </label>

      {editingTodo?.id !== todo.id ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditingTodo(todo)}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleTodoDelete(todo.id)}
          >
            ×
          </button>
        </>
      ) : (
        <form>
          <input
            type="text"
            data-cy="TodoTitleField"
            className="todo__title-field edit"
            placeholder="Empty todo will be deleted"
            value={editingTodo?.title || ''}
            onChange={event =>
              setEditingTodo({
                ...editingTodo,
                title: event.target.value,
              })
            }
            onKeyDown={event => {
              if (event.key === 'Enter') {
                handleTodoUpdate(editingTodo);
              } else if (event.key === 'Escape') {
                setEditingTodo(null);
              }
            }}
          />
        </form>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': loadingTodosIds.includes(todo.id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
