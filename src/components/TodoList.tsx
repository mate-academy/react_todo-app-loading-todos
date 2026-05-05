import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import '../styles/todo.scss';

type Props = {
  todos: Todo[];
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  editing: Todo | null;
  setEditing: (todo: Todo | null) => void;
  loadingTodo: boolean;
  setActiveTodo: (todo: Todo | null) => void;
  activeTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  updateTodo,
  deleteTodo,
  editing,
  setEditing,
  loadingTodo,
  setActiveTodo,
  activeTodo,
}) => {
  const [editedValue, setEditedValue] = useState('');

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <div
            key={todo.id}
            data-cy="Todo"
            className={classNames('todo', {
              completed: todo.completed === true,
            })}
            onDoubleClick={e => {
              e.preventDefault();
              setActiveTodo(todo);
              setEditing(todo);
              setEditedValue(todo.title);
            }}
          >
            <label
              htmlFor={`checkbox-${todo.id}`}
              className="todo__status-label"
            >
              {''}
              <input
                data-cy="TodoStatus"
                type="checkbox"
                id={`checkbox-${todo.id}`}
                className="todo__status"
                checked={todo.completed}
                onChange={() => {
                  updateTodo({ ...todo, completed: !todo.completed });
                  setActiveTodo(todo);
                }}
              />
            </label>

            {todo.id === editing?.id ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateTodo({ ...todo, title: editedValue });
                }}
              >
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={editedValue}
                  onBlur={() => setEditing(null)}
                  onChange={e => setEditedValue(e.target.value)}
                />
              </form>
            ) : (
              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>
            )}

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => {
                setActiveTodo(todo);
                deleteTodo(todo.id);
              }}
            >
              ×
            </button>

            <div
              data-cy="TodoLoader"
              className={classNames('modal overlay', {
                'is-active': loadingTodo && activeTodo?.id === todo.id,
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
