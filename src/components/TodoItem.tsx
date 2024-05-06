/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import cn from 'classnames';
// import { ListAct } from '../types/Actions';
import { Todo } from '../types/Todo';
import { Action, TodoContext } from './TodoContext';
import { USER_ID, updateTodo } from '../api/todos';

type Props = {
  todo: Todo;
  dispatch: (action: Action) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, dispatch }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const { setError } = useContext(TodoContext);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = () => {
    setIsEdit(false);

    if (!title.trim()) {
      // dispatch({ type: ListAct.Delete, payload: todo.id });
      dispatch({ type: 'deleteTodo', payload: todo.id });
      setError('Unable to delete todos');
    } else {
      dispatch({
        type: 'updateTodo',
        payload: {
          id: todo.id,
          title: title.trim(),
          userId: USER_ID,
          completed: false,
        },
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle(todo.title);
      setIsEdit(false);
    } else if (event.key === 'Enter') {
      handleFormSubmit();
    }
  };

  const handleBlur = () => {
    setTitle(title.trim());
    handleFormSubmit();
  };

  const handleComplete = () => {
    updateTodo({ ...todo, completed: !todo.completed });
    // dispatch({
    //   type: ListAct.SetComplet,
    //   payload: { id: todo.id, completed: !todo.completed },
    // });
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleComplete}
        />
      </label>

      {isEdit ? (
        <form onSubmit={handleFormSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            autoFocus
            onChange={handleFormChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEdit(true);
            }}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              // dispatch({ type: ListAct.Delete, payload: todo.id });
              dispatch({ type: 'deleteTodo', payload: todo.id });
            }}
          >
            ×
          </button>
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </>
      )}
    </div>
  );
};
