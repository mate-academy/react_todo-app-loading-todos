import { isEqual } from 'lodash';
import {
  ChangeEvent, memo, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import { TodoLoader } from '../TodoLoader/TodoLoader';

import { TPatchTodo } from '../../api/todos';

import { ITodo } from '../../types/Todo.interface';

type Props = {
  todo: ITodo;
  isProcessing: boolean;
  isVisible: boolean;
  onSave: (todoId: number, data: TPatchTodo) => void;
  onDelete: (todoId: number) => void;
};

export const TodoItem: React.FC<Props> = memo(({
  todo,
  isProcessing,
  isVisible,
  onSave,
  onDelete,
}) => {
  const editField = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(todo.title);

  useEffect(() => {
    if (editField.current) {
      editField.current.focus();
    }
  }, [isEditing]);

  const saveTodo = (data: TPatchTodo) => {
    setIsEditing(false);
    onSave(todo.id, data);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isProcessing) {
      return;
    }

    setCurrentTitle(event.currentTarget.value);
  };

  const handleKeydown = (event: React.KeyboardEvent) => {
    if (isProcessing) {
      return;
    }

    if (event.code !== 'Escape') {
      return;
    }

    setCurrentTitle(todo.title);
    setIsEditing(false);
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
          'todo--visible': isVisible,
        },
      )}
    >

      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
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
            onKeyDown={handleKeydown}
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
            onClick={() => onDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}

      {isProcessing && <TodoLoader />}
    </div>
  );
}, isEqual);
