import { isEqual } from 'lodash';
import {
  ChangeEvent, memo, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import { TodoLoader } from '../TodoLoader/TodoLoader';

import { PatchTodoData } from '../../api/todos';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isProcessing: boolean;
  onSave: (todoId: number, data: PatchTodoData) => void;
};

export const TodoItem: React.FC<Props> = memo(({
  todo,
  isProcessing,
  onSave,
}) => {
  const editField = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(todo.title);

  useEffect(() => {
    if (editField.current) {
      editField.current.focus();
    }
  }, [isEditing]);

  const saveTodo = (data: PatchTodoData) => {
    setIsEditing(false);
    onSave(todo.id, data);
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

  // eslint-disable-next-line no-console
  console.log('TodoItem re-render', todo.id);

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
