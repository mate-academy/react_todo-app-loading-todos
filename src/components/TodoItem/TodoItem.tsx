import { isEqual } from 'lodash';
import {
  ChangeEvent, memo, useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import { TodoLoader } from '../TodoLoader/TodoLoader';

import { DispatchContext, StateContext } from '../../providers/StateContext';

import { patchTodo, PatchTodoData } from '../../api/todos';

import { Todo } from '../../types/Todo';
import { ActionTypes } from '../../types/ActionTypes';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = memo(({ todo }) => {
  const editField = useRef<HTMLInputElement>(null);

  const dispatch = useContext(DispatchContext);
  const { loaders } = useContext(StateContext);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(todo.title);

  const isProcessing = loaders.some(
    loader => loader.id === todo.id && loader.on,
  );

  useEffect(() => {
    if (editField.current) {
      editField.current.focus();
    }
  }, [isEditing]);

  const saveTodo = (data: PatchTodoData) => {
    setIsEditing(false);
    dispatch({
      type: ActionTypes.SET_LOADER,
      loader: {
        id: todo.id,
        on: true,
      },
    });

    patchTodo(todo.id, data)
      .then(newTodo => {
        dispatch({
          type: ActionTypes.EDIT_TODO,
          todo: newTodo,
        });
      })
      .catch(() => {
        dispatch({
          type: ActionTypes.SET_ERROR,
          error: {
            message: 'Unable to update a todo',
            show: true,
          },
        });
      })
      .finally(() => {
        dispatch({
          type: ActionTypes.SET_LOADER,
          loader: {
            id: todo.id,
            on: false,
          },
        });
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isProcessing) {
      return;
    }

    setCurrentTitle(event.currentTarget.value);
  };

  const handleTitleChange = () => {
    saveTodo({
      title: currentTitle,
    });
  };

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    if (isProcessing) {
      return;
    }

    saveTodo({
      completed: event.currentTarget.checked,
    });
  };

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        {
          completed: todo.completed,
        },
      )}
    >

      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
          onChange={handleCheck}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleTitleChange}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            defaultValue={currentTitle}
            ref={editField}
            onChange={handleChange}
            onBlur={handleTitleChange}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {currentTitle}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
          >
            ×
          </button>
        </>
      )}

      {isProcessing && <TodoLoader />}
    </div>
  );
}, isEqual);
