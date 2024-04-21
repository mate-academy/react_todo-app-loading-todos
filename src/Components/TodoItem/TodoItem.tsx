import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos, deleteTodo, toggleTodoCompleted, editTodo } =
    useContext(TodosContext);
  const [editing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(todo.title);
  const [editingId, setEditingId] = useState('');

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [editingId, editing]);

  const handleTodoCompleted = (id: number, completed: boolean) => {
    toggleTodoCompleted(id, completed);
    const updateTodos = todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return { ...currentTodo, completed: !currentTodo.completed };
      }

      return currentTodo;
    });

    setTodos(updateTodos);
  };

  const todoEdit = (id: number, title: string) => {
    const currentTitle = title.trim();

    editTodo(id, currentTitle);
    setEditing(false);
    setEditingId(todo.id.toString());

    const editingTodos = todos.map(item => {
      if (todo.id === item.id) {
        return { ...item, title: currentTitle };
      }

      return item;
    });

    setTodos(editingTodos);
  };

  return (
    <div
      key={todo.id.toString()}
      data-cy="Todo"
      className={classNames('todo', {
        editing: editing,
        completed: todo.completed,
      })}
      onDoubleClick={() => {
        setEditing(true);
        setEditingId(todo.id.toString());
      }}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={event => {
            handleTodoCompleted(+event.target.id, todo.completed);
          }}
        />
      </label>

      {editing ? (
        <form onSubmit={event => event.preventDefault()}>
          <input
            data-cy="TodoTitleField"
            type="text"
            ref={titleField}
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingValue}
            onBlur={() => todoEdit(todo.id, editingValue.trim())}
            onKeyUp={event => {
              if (event.key === 'Escape' || event.key === 'Enter') {
                event.preventDefault();
                todoEdit(todo.id, editingValue.trim());
              }
            }}
            onChange={event => {
              setEditingValue(event.target.value);
            }}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onClick={event => {
            event.preventDefault();
          }}
        >
          {todo.title}
        </span>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => deleteTodo(todo.id)}
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
