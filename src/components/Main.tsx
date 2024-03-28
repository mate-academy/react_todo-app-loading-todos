/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { ErrorContext, LoadingContext, TodosContext } from './TodoContext';
import { deleteTodos, editTodos } from '../api/todos';
import { Status } from '../types/Status';
import { getFilteredItems } from '../services/getFilteredItems';

type Props = {
  query: Status;
};

export const Main: React.FC<Props> = ({ query }) => {
  const { list, setList } = useContext(TodosContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const { isLoading } = useContext(LoadingContext);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const listToGo = useMemo(() => {
    return getFilteredItems(list, query);
  }, [list, query]);

  const handleTodoDelete = useCallback(
    (todoId: number) => {
      deleteTodos(todoId).catch(() =>
        setErrorMessage('Unable to delete a todo'),
      );

      setList(currentTodos => {
        return currentTodos.filter(currentTodo => currentTodo.id !== todoId);
      });
    },
    [setErrorMessage, setList],
  );

  const handleTodoUpdate = useCallback(
    (updatedTodo: Todo) => {
      if (!updatedTodo.title.trim()) {
        handleTodoDelete(updatedTodo.id);
        setErrorMessage('Unable to add a todo');

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
        .catch(() => setErrorMessage('Unable to update a todo'));
    },
    [handleTodoDelete, setErrorMessage, setList],
  );

  const handleCheckbox = (todo: Todo) => {
    const updatedList = list.map((item: Todo) => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    setList(updatedList);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {listToGo.map((todo: Todo) => (
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

          {/* This todo is in loadind state */}
          {/* 'is-active' class puts this modal on top of the todo */}
          {/* overlay will cover the todo while it is being deleted or updated */}
          {isLoading ? (
            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className={classNames({ loader: isLoading })} />
            </div>
          ) : (
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};
