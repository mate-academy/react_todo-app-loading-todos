import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { Form } from './Form';
import { TodoModal } from './TodoModal';

type Props = {
  todos: Todo[],
  title: string
  onRemoveTodo: (userId: number, todoId: number) => void,
  userId: number
  setTitle: (title: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onRemoveTodo,
  userId,
  title,
  setTitle,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <section className="todoapp__main">
      {todos.map((todo) => (
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
              id="todo_selected"
              checked={todo.completed}
              onChange={(() => {
                // onSetCompleted((state) => !state);
              })}
            />
          </label>
          {editing
            ? (
              <Form
                title={title}
                onSubmit={() => {}}
                setTitle={setTitle}
                className="todo__title-field"
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
                  onClick={() => {
                    onRemoveTodo(userId, todo.id);
                  }}
                >
                  ×
                </button>
              </>
            )}
          {/* overlay will cover the todo while it is being updated */}
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
