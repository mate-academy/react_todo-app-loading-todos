import { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { deleteTodo, toogleTodo } from '../api/todos';

type Props = {
  todo: Todo;
  handleUpdateTodo: (todoId: number, todo: Todo) => void;
  onSetErrorMessage: (str: string) => void;
  isHasError: () => void;
  todosLoadingState: Todo[],
  setTodosLoadingState: Dispatch<SetStateAction<Todo[]>>;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  handleUpdateTodo,
  onSetErrorMessage,
  isHasError,
  todosLoadingState,
  setTodosLoadingState,
}) => {
  const { title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);

  const removeTodo = async (todoRemove: Todo) => {
    try {
      setTodosLoadingState(currentTodos => [...currentTodos, todoRemove]);
      await deleteTodo(todo.id);
    } catch {
      onSetErrorMessage('Unable to delete a todo');
      isHasError();
    } finally {
      setTodosLoadingState(currentTodos => currentTodos
        .filter(({ id }) => id !== todoRemove.id));
    }
  };

  const handleToogleClick = async (todoTogle: Todo) => {
    try {
      setTodosLoadingState(currentTodos => [...currentTodos, todoTogle]);
      await toogleTodo(todoTogle.id, !completed);
    } catch {
      onSetErrorMessage('Unable to cange status a todo');
    } finally {
      setTodosLoadingState(currentTodos => currentTodos
        .filter(({ id }) => id !== todoTogle.id));
    }
  };

  const eventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTodoTitle(value);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    const trimTodoTitle = todoTitle.trim();

    if (trimTodoTitle === todo.title) {
      setTodoTitle(title);

      return;
    }

    if (!trimTodoTitle) {
      deleteTodo(todo.id);

      return;
    }

    handleUpdateTodo(todo.id, {
      ...todo,
      title: todoTitle,
    });
  };

  const onCancelEditing = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.code === 'Escape') {
      setIsEditing(false);
      setTodoTitle(todo.title);
    }
  };

  const hasLoadingState = todosLoadingState
    .some(todoLoading => todoLoading.id === todo.id);

  const isLoading = todo.id === 0 || hasLoadingState;

  return (
    <li
      className={classNames(
        'todo',
        { completed },
      )}
      onDoubleClick={() => setIsEditing(true)}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onClick={() => {
            handleToogleClick(todo);
          }}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={handleOnSubmit}
        >
          <input
            type="text"
            value={todoTitle}
            placeholder="Empty todo will be deleted"
            className="todo__title-field"
            onChange={(e) => eventChange(e)}
            onKeyUp={(e) => onCancelEditing(e)}
          />
        </form>
      ) : (
        <span className="todo__title">{todoTitle}</span>
      )}

      <button
        type="button"
        className="todo__remove"
        onClick={() => {
          removeTodo(todo);
        }}
      >
        ×
      </button>

      <div
        className={classNames(
          'modal overlay',
          { 'is-active': isLoading },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
};
