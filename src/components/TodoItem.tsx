import classNames from 'classnames';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../stores/TodosContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  isUpdating: boolean,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isUpdating,
}) => {
  const {
    deleteTodo,
    updateTodo,
  } = useContext(TodosContext);

  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      input.current?.focus();
      setNewTitle(todo.title);
    }, 0);
  }, [editing, todo.title]);

  const handleDelete = () => deleteTodo(todo.id);

  const toggleTodo = () => {
    const newTodo: Todo = {
      ...todo,
      completed: !todo.completed,
    };

    updateTodo(newTodo);
  };

  function handleDoubleClick() {
    setEditing(true);
    input.current?.focus();
  }

  function changeTitle() {
    if (newTitle === todo.title || isUpdating) {
      return;
    }

    if (newTitle.trim() !== todo.title && newTitle.trim()) {
      const newTodo = {
        ...todo,
        title: newTitle.trim(),
      };

      updateTodo(newTodo);
      input.current?.blur();

      return;
    }

    if (newTitle.trim().length === 0) {
      deleteTodo(todo.id);
      input.current?.blur();
    }
  }

  function handleBlur() {
    setEditing(false);
    changeTitle();
  }

  function handleInputClick(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setEditing(false);

      return;
    }

    if (e.key === 'Enter') {
      changeTitle();
      setEditing(false);
    }
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={toggleTodo}
        />
      </label>

      {editing ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          ref={input}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyUp={handleInputClick}
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal', 'overlay', {
          'is-active': isUpdating,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
