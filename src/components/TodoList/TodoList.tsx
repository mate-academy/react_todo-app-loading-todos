/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { UIEditingStates } from '../../types/States';

type Props = {
  todos: Todo[];
  toggleTodo: (todo: Todo) => void;
  editingStates: UIEditingStates;
  setEditingStates: React.Dispatch<React.SetStateAction<UIEditingStates>>;
  setUpdatedTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  deleteSelectedTodo: (currentTodos: Todo[], todoToDelete: Todo) => Todo[];
  updatedTodoTitle: string;
  isLoading: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  setUpdatedTodoTitle,
  updatedTodoTitle,
  editingStates,
  setEditingStates,
  setTodoTitle,
  setTodos,
  deleteSelectedTodo,
  isLoading,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <div
        data-cy="Todo"
        key={todo.id}
        className={classNames('todo', { completed: todo.completed })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onClick={() => toggleTodo(todo)}
          />
        </label>

        {editingStates.isFocusTitle &&
        todo.id === editingStates.selectedTodo?.id ? (
          <form
            onSubmit={event => {
              event.preventDefault();

              setTodoTitle(updatedTodoTitle);
              if (updatedTodoTitle === '') {
                setTodos(currentTodos =>
                  deleteSelectedTodo(currentTodos, todo),
                );
              }
            }}
          >
            <input
              data-cy="TodoTitleField"
              type="text"
              autoFocus={editingStates.selectedTodo.id === todo.id}
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              onChange={event => setUpdatedTodoTitle(event.target.value)}
              value={updatedTodoTitle}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              onDoubleClick={() => {
                setEditingStates(prevStates => {
                  return {
                    ...prevStates,
                    isFocusTitle: true,
                    selectedTodo: todo,
                  };
                });
                setUpdatedTodoTitle(todo.title);
              }}
              className="todo__title"
            >
              {todo.title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() =>
                setTodos(currentTodos => deleteSelectedTodo(currentTodos, todo))
              }
            >
              ×
            </button>
          </>
        )}

        <div
          data-cy="TodoLoader"
          className={classNames('modal overlay', {
            'is-active': isLoading,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </section>
);
