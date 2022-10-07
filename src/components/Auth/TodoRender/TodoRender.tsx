import classNames from 'classnames';
import {
  KeyboardEvent, useContext, useEffect, useRef,
} from 'react';
import { deleteTodo, updateTodo } from '../../../api/todos';
import { TypeChange } from '../../../types/TypeChange';
import { Todo } from '../../../types/Todo';
import { TodoContext } from '../../../context/TodoContext';
import { Error } from '../../../types/Error';

type Props = {
  todo: Todo,
};

export const TodoRender: React.FC<Props> = ({
  todo,
}) => {
  const {
    handleStatusChange,
    selectedTodoId,
    setSelectedTodoId,
    setInputValue,
    inputValue,
    handleChangeTitle,
    setLoadError,
    setErrorMessage,
    allCompletedLoader,
    todoIdLoader,
    setTodoIdLoader,
    toggleLoader,
  } = useContext(TodoContext);

  const {
    title, completed, id,
  } = todo;
  const newTodoField = useRef<HTMLInputElement>(null);

  const removeFromServer = async (data: Todo) => {
    try {
      setTodoIdLoader(data.id);
      await deleteTodo(data.id);
      handleStatusChange(data, TypeChange.delete);
    } catch (_) {
      setLoadError(true);
      setErrorMessage(Error.delete);
    } finally {
      setTodoIdLoader(null);
      setSelectedTodoId(-1);
    }
  };

  const updateTodoOnServer = async (type: TypeChange) => {
    try {
      const copyOfTodo = { ...todo };

      setTodoIdLoader(id);
      switch (type) {
        case TypeChange.checkbox:
          copyOfTodo.completed = !completed;
          break;
        case TypeChange.title:
          copyOfTodo.title = inputValue;
          setSelectedTodoId(id);
          break;
        default:
          return;
      }

      await updateTodo(id, copyOfTodo);
      handleStatusChange(todo, type);
    } catch {
      setLoadError(true);
      setErrorMessage(Error.update);
    } finally {
      setTodoIdLoader(null);
      if (type === TypeChange.title) {
        setSelectedTodoId(-1);
      }
    }
  };

  const handleRenameTitle = async () => {
    if (title === inputValue) {
      setSelectedTodoId(-1);

      return;
    }

    if (!inputValue.trim()) {
      removeFromServer(todo);

      return;
    }

    updateTodoOnServer(TypeChange.title);

    if (newTodoField.current) {
      newTodoField.current.blur();
    }
  };

  const handleSubmitOnKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newTodoField.current) {
      newTodoField.current.blur();
    }

    if (event.key === 'Escape') {
      setSelectedTodoId(-1);
    }
  };

  const handleDoubleClick = () => {
    setSelectedTodoId(todo.id);
    setInputValue(title);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [selectedTodoId]);

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { completed },
      )}
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
          onClick={() => updateTodoOnServer(TypeChange.checkbox)}
        />
      </label>

      {(selectedTodoId !== id && (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </span>
      ))}
      {selectedTodoId === id && (
        <input
          value={inputValue}
          className="input is-large is-primary"
          onBlur={() => handleRenameTitle()}
          onChange={handleChangeTitle}
          onKeyUp={handleSubmitOnKey}
          ref={newTodoField}
        />
      )}
      {selectedTodoId !== id && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDeleteButton"
          onClick={() => removeFromServer(todo)}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames(
          'modal overlay',
          {
            'is-active': todo.id === todoIdLoader
            || (allCompletedLoader && todo.completed) || toggleLoader,
          },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>

  );
};
