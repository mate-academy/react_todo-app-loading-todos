import classNames from 'classnames';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../context/TodoContext';

export const TodoBody: React.FC = () => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const editFocus = useRef<HTMLInputElement | null>(null);
  const {
    filteringBy, newTodoId, isLoading, deleteTodo, updateTodo,
  } = useContext(TodosContext);

  useEffect(() => {
    if (editFocus.current) {
      editFocus.current.focus();
    }
  }, [editValue]);

  const handleEditingTodo = (
    event: React.FormEvent<HTMLFormElement>,
    todo: Todo,
  ) => {
    event.preventDefault();

    if (editValue === todo.title) {
      return;
    }

    updateTodo({ ...todo, title: editValue });
    setIsEditing(null);
    setEditValue('');
  };

  const resetEditing = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      setIsEditing(null);
      setEditValue('');
    }
  };

  return (
    <section className="todoapp__main">
      {filteringBy.map(todo => (
        <div
          className={classNames(
            'todo',
            { completed: todo.completed },
          )}
          key={todo.id}
          onDoubleClick={() => {
            setIsEditing(todo.id);
            setEditValue(todo.title);
          }}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              onChange={() => updateTodo(
                { ...todo, completed: !todo.completed },
              )}
            />
          </label>

          {todo.id === isEditing ? (
            <form onSubmit={(event) => handleEditingTodo(event, todo)}>
              <input
                ref={editFocus}
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editValue}
                onKeyUp={resetEditing}
                onChange={(event) => setEditValue(event.target.value)}
              />
            </form>
          ) : (
            <>
              <span className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </button>
            </>
          )}

          <div className={classNames(
            'modal overlay',
            { 'is-active': newTodoId === todo.id },
            { 'is-active': isLoading },
          )}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
