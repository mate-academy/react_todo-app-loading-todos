/* eslint-disable jsx-a11y/label-has-associated-control */

import * as client from '../../api/todos';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  todo: Todo;
  setTodos: Dispatch<SetStateAction<Todo[] | undefined>>;
  setError: (error: string) => void;
};

export const TodoComponent: React.FC<Props> = ({
  todo,
  setTodos,
  setError,
}) => {
  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={event => {
            client
              .editTodo(todo.id, {
                ...todo,
                completed: event.target.checked,
              })
              .then(updatedTodo =>
                setTodos(previousTodos =>
                  previousTodos?.map(item => {
                    if (item.id === updatedTodo.id) {
                      return updatedTodo;
                    }

                    return item;
                  }),
                ),
              );
          }}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() =>
          client
            .deleteTodo(todo.id)
            .then(() => {
              setTodos(previusTodos =>
                previusTodos?.filter(item => item.id !== todo.id),
              );
            })
            .catch(() => setError('Unable to delete a todo'))
        }
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
