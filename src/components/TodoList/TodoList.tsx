import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { mainFilter } from '../../utils';

type Props = {
  todos: Todo[],
  handleRemove: (todoId: number) => void,
  handleComplete: (todoId: number) => void,
  handleFormComplete: () => void,
  handleTodoChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    todoIt: number,
  ) => void,
  handleCurrTodoChange: (
    event: React.FormEvent<HTMLFormElement> | null,
    todoIt: number,
    title: string,
  ) => void,
  position: string,
  isForm: boolean,
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleRemove,
  handleComplete,
  handleFormComplete,
  handleTodoChange,
  handleCurrTodoChange,
  position,
  isForm,
}) => {
  return (
    <>
      {todos.filter(todo => mainFilter(todo, position))
        .map(({ id, completed, title }) => {
          return (
            <div
              data-cy="Todo"
              className={classNames('todo',
                { completed })}
              key={id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={completed}
                  onChange={() => handleComplete(id)}
                />
              </label>
              {!isForm && (
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onClick={handleFormComplete}
                  aria-hidden="true"
                >
                  {title}
                </span>
              )}

              {isForm && (
                <form
                  onSubmit={
                    (event) => handleCurrTodoChange(event, id, title)
                  }
                >
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={title}
                    onChange={(event) => handleTodoChange(event, id)}
                    onBlur={() => handleCurrTodoChange(null, id, title)}
                  />
                </form>
              )}

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDeleteButton"
                onClick={() => handleRemove(id)}
              >
                ×
              </button>

              <div
                data-cy="TodoLoader"
                className="'modal overlay"
              >
                <div
                  className="modal-background has-background-white-ter"
                />
                <div className="loader" />
              </div>
            </div>

          );
        })}
    </>
  );
};
