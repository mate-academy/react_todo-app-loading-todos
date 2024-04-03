/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';

import { Todo } from '../types/Todo';
import { ChangeEvent, FormEvent, useState } from 'react';

type Props = {
  todo: Todo;
  setSelectedTodo: (todo: Todo) => void;
  setUpdatingTodo: (updatingTodo: number | null) => void;
  updatingTodo: number | null;
  isDeleting?: boolean;
  selectedTodo: Todo | null;
  onDelete: (id: number) => void;
  onPatch: (
    event: React.FormEvent<HTMLFormElement> | ChangeEvent<HTMLInputElement>,
    todo: Todo,
  ) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setSelectedTodo,
  setUpdatingTodo,
  updatingTodo,
  selectedTodo,
  onDelete,
  onPatch,
}) => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const onSelect = (todoItem: Todo) => {
    setUpdatingTodo(todoItem.id);
    setSelectedTodo(todoItem);
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (selectedTodo) {
      setIsDoubleClicked(false);
      onPatch(event, selectedTodo);
    }
  };

  const isUpdatingTodo = !updatingTodo || updatingTodo !== todo.id;
  const isSelectedTodo = !selectedTodo || selectedTodo.id !== todo.id;

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            {
              setSelectedTodo({
                ...todo,
                completed: !todo.completed,
              });
            }
          }}
        />
      </label>

      {isUpdatingTodo && isSelectedTodo && !isDoubleClicked ? (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            onSelect(todo);
            setIsDoubleClicked(true);
          }}
        >
          {todo.title}
        </span>
      ) : (
        <form
          onSubmit={event => onFormSubmit(event)}
          onBlur={event => onFormSubmit(event)}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={selectedTodo?.title}
            onChange={event => {
              if (selectedTodo) {
                setSelectedTodo({
                  ...selectedTodo,
                  title: event.target.value,
                });
              }
            }}
          />
        </form>
      )}
      {isUpdatingTodo && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => onDelete(todo.id)}
        >
          ×
        </button>
      )}

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
