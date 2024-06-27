/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { updateTodo, deleteTodo } from '../../api/todos';
import { IsActiveError } from '../../types/types';

interface TodoItemProps {
  todo: Todo;
  todos: Todo[];
  setTodos: (arg: Todo[]) => void;
  setIsError: (arg: IsActiveError) => void;
}

type UpdateEvent =
  | React.MouseEvent<HTMLInputElement, MouseEvent>
  | React.FormEvent<HTMLFormElement>;

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  todos,
  setTodos,
  setIsError,
}) => {
  const [loader, setLoader] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [title, setTitle] = React.useState(todo.title);

  const newList = React.useMemo(() => {
    return todos.filter(item => item.id !== todo.id);
  }, [todos, todo.id]);

  function handleUpdateTodo(newData: string | boolean, event: UpdateEvent) {
    event.preventDefault();

    const preparedTodos = (updatedTodo: Todo) => {
      return todos.map(item => {
        return item.id === updatedTodo.id ? updatedTodo : item;
      });
    };

    setLoader(true);

    switch (newData) {
      case todo.completed:
        updateTodo(todo.id, {
          ...todo,
          completed: !todo.completed ? true : false,
        })
          .then(res => {
            setTodos(preparedTodos(res));
          })
          .catch(() => {
            setIsError(IsActiveError.Update);
          })
          .finally(() => {
            setLoader(false);
          });
        break;
      case todo.title:
        updateTodo(todo.id, {
          ...todo,
          title: title,
        })
          .then(res => {
            setTodos(preparedTodos(res));
            setIsFocused(false);
          })
          .catch(() => {
            setIsError(IsActiveError.Update);
          })
          .finally(() => {
            setLoader(false);
          });
        break;
    }
  }

  function handleDeleteTodo(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();

    setLoader(true);

    deleteTodo(todo.id)
      .then(() => {
        setTodos(newList);
      })
      .catch(() => {
        setIsError(IsActiveError.Delete);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
          onClick={event => handleUpdateTodo(todo.completed, event)}
        />
      </label>

      {isFocused ? (
        <form onSubmit={event => handleUpdateTodo(todo.title, event)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={event => setTitle(event.target.value.trimStart())}
            onBlur={() => setIsFocused(false)}
            autoFocus={isFocused}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsFocused(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={event => handleDeleteTodo(event)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': loader,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
