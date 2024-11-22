import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { deleteTodos, editTodos, getTodos } from './api/todos';
import { Todo } from './types/Todo';

type Props = {
  todo: Todo;
  todos: Todo[];
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, title, completed },
  todos,
  updateTodos,
  setTodos,
  setErrorMessage,
}) => {
  const [editingId, setEditingId] = useState<null | number>(null);
  const [editingVal, setEditingVal] = useState('');

  const ref = useRef<HTMLInputElement | null>(null);

  const handleDouble = (todoId: number, todoTitle: string) => {
    setEditingId(todoId);
    setEditingVal(todoTitle);
  };

  const handleDelete = async (todoId: number) => {
    try {
      await deleteTodos(todoId);
      updateTodos(todoId, null);
      const updatedTodos = await getTodos();

      setTodos(updatedTodos);
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
    }
  };

  const handleSubmit = async (todoId: number) => {
    if (editingVal.trim() === '') {
      handleDelete(todoId);

      return;
    }

    const todoToUpdate = todos.find(todo => todo.id === todoId);

    if (todoToUpdate) {
      const updatedTodo = {
        title: editingVal,
        todoId: todoToUpdate.id,
      };

      try {
        await editTodos(updatedTodo);
        updateTodos(todoId, editingVal);
        setEditingId(null);
      } catch (error) {
        setErrorMessage('Unable to update a todo');
      }
    }
  };

  useEffect(() => {
    if (editingId !== null && ref.current) {
      (ref.current as HTMLInputElement).focus();
    }
  }, [editingId]);

  return (
    <div
      key={id}
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label htmlFor={`todo-${id}`} className="todo__status-label">
        {}
        <input
          id={`todo-${id}`}
          checked={completed}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => {}}
        />
      </label>

      {editingId === id ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(id);
          }}
        >
          <input
            ref={ref}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={editingVal}
            onChange={event => {
              setEditingVal(event.target.value);
            }}
            onBlur={() => {
              handleSubmit(id);
            }}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => handleDouble(id, title)}
        >
          {title}
        </span>
      )}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => handleDelete(id)}
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
