import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../../../types/Todo';
import { DispatchContext, TodosContext } from '../../../../Store';
import { updateTodo } from '../../../../api/todos';

export const TodoItem = React.memo(({ todo }: { todo: Todo }) => {
  const dispatch = useContext(DispatchContext);
  const { loading, selectedTodoId } = useContext(TodosContext);
  const [editing, setEditing] = useState(false);
  const [inputText, setInputText] = useState(todo.title || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent | { key: 'Enter' }) => {
    switch (event.key) {
      case 'Enter':
        if (event.key !== 'Enter' && inputText.trim().length < 1) {
          dispatch({ type: 'deleteTodo', payload: todo.id });
          setEditing(false);
        } else {
          const prevTodo = todo;

          const updatedTodo = {
            id: todo.id,
            userId: todo.userId,
            title: inputText,
            completed: todo.completed,
          };

          dispatch({ type: 'editTodo', payload: updatedTodo });
          dispatch({
            type: 'loading',
            payload: { load: true, id: updatedTodo.id || 0 },
          });

          updateTodo(updatedTodo)
            .catch(() => {
              dispatch({ type: 'editTodo', payload: prevTodo });
              dispatch({
                type: 'setError',
                payload: 'Unable to update a todo',
              });
              // dispatch({ type: 'deleteTodo', payload: todo.id });
            })
            .finally(() => {
              dispatch({
                type: 'loading',
                payload: { load: false, id: updatedTodo.id || 0 },
              });
              const timeout = setTimeout(() => {
                dispatch({ type: 'setError', payload: null });
                clearTimeout(timeout);
              }, 3000);
            });
          setEditing(false);
        }

        break;
      case 'Escape':
        setInputText(todo.title || '');
        setEditing(false);

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed }, { editing })}
      onDoubleClick={() => setEditing(true)}
    >
      <label className="todo__status-label" htmlFor={`toggle-view-${todo.id}`}>
        <input
          type="checkbox"
          data-cy="TodoStatus"
          className="todo__status"
          checked={todo.completed}
          id={`toggle-view-${todo.id}`}
          onChange={() => dispatch({ type: 'toggleTodo', payload: todo.id })}
        />
      </label>

      <form
        hidden={!editing}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        onBlur={() => handleKeyDown({ key: 'Enter' })}
      >
        <input
          ref={inputRef}
          data-cy="TodoTitleField"
          type="text"
          value={inputText}
          className="todo__title-field edit "
          placeholder="Empty todo will be deleted"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputText(event.target.value)
          }
          onBlur={() => handleKeyDown({ key: 'Enter' })}
          onKeyUp={event => handleKeyDown(event)}
        />
      </form>
      <>
        <span hidden={editing} data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>
        <button
          hidden={editing}
          type="button"
          className="todo__remove "
          data-cy="TodoDelete"
          aria-label="Delete Todo"
          onClick={() => dispatch({ type: 'deleteTodo', payload: todo.id })}
        >
          ×
        </button>
      </>
      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={cn('modal', 'overlay', {
          'is-active': loading && selectedTodoId === todo.id,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});
