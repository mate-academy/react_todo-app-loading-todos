import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { Form } from './Form';
import { TodoModal } from './TodoModal';

type Props = {
  title: string;
  todos: Todo[];
  setTitle: (title: string) => void;
  addCompletedTodos: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  title,
  todos,
  setTitle,
  addCompletedTodos,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={classNames(
            'todo',
            { completed: todo.completed },
          )}
        >
          <label
            className="todo__status-label"
          >
            <input
              type="checkbox"
              className="todo__status"
              onChange={() => addCompletedTodos(todo.id)}
            />
          </label>
          {editing
            ? (
              <Form
                title={title}
                setTitle={setTitle}
                className="top__title-field"
                placeholder="Empty todo will be deleted"
              />
            )
            : (
              <>
                <span
                  className="todo__title"
                  onDoubleClick={() => {
                    setEditing(true);
                  }}
                  onSubmit={() => {
                    setEditing(false);
                  }}
                >
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                >
                  ×
                </button>
              </>
            )}
          {editing && (
            <TodoModal
              editing={editing}
            />
          )}
        </div>
      ))}
    </section>
  );
};
