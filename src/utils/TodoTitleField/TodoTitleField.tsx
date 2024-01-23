import classNames from 'classnames';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[];
  todo: Todo;
  handleError: (errorMessage: string) => void;
  updateChecked: (todo: Todo) => void;
};

export const TodoTitleField:React.FC<Props> = (
  {
    filteredTodos,
    todo,
    handleError,
    updateChecked,
  },

) => {
  const [changedTodo, setChangedTodo] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [focus, setFocus] = useState(false);
  const todoFocus = useRef<HTMLInputElement>(null);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangedTodo(event.target.value);
  };

  const handleDoubleClick = useCallback((el: Todo) => {
    setIsEditing(true);
    setFocus(true);
    const selectedTodo = filteredTodos.find(item => item.id === el.id);

    if (selectedTodo) {
      setChangedTodo(selectedTodo.title);
    }
  }, [filteredTodos, setIsEditing]);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleDeleteTodo = () => {
    handleError('Unable to delete a todo');
  };

  const clickEnterOrEsc = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.key === 'Enter') {
      if (changedTodo.trim() === '') {
        handleDeleteTodo();
        setIsEditing(false);
      } else {
        handleSave();
      }
    } else if (event.key === 'Escape') {
      setIsEditing(false);
    }

    setFocus(false);
  };

  const handleBlur = () => {
    // handleSave();
    // setIsEditing(false);
    // setFocus(false);
  };

  useEffect(() => {
    if (todoFocus.current && focus) {
      todoFocus.current.focus();
    }
  }, [isEditing, focus]);

  return (
    <>
      <div
        key={todo.id}
        data-cy="Todo"
        className={classNames(
          'todo',
          { completed: todo.completed },
        )}
      >
        {!isEditing
          ? (
            <>
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onClick={() => updateChecked(todo)}
                />
              </label>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => handleDoubleClick(todo)}
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={handleDeleteTodo}
              >
                ×
              </button>
            </>
          )
          : (
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder={todo.title || 'Empty todo will be deleted'}
              ref={todoFocus}
              onKeyUp={clickEnterOrEsc}
              value={changedTodo}
              onChange={handleTitle}
              onBlur={() => handleBlur()}
            />
          )}
      </div>
    </>
  );
};
