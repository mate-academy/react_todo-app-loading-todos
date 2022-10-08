import classNames from 'classnames';
import {
  FocusEvent,
  FormEvent,
  MouseEvent,
  useState,
} from 'react';
import { updatingTodoTitle } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader/Loader';

type Props = {
  todo: Todo;
  toggleStatusOnServer: (id: number, comleted: boolean) => void;
  loadingTodoid: number | null;
  deleteTodo: (id: number) => void;
  setloadingTodoId: (id: number | null) => void;
  setErrorMessage: (message: string) => void;
  changeTitle: (id: number, title: string,) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleStatusOnServer,
  loadingTodoid,
  deleteTodo,
  setloadingTodoId,
  setErrorMessage,
  changeTitle,
}) => {
  const [isDoublClick, setIsDublClick] = useState(false);
  const { title, completed, id } = todo;
  const [newTitle, setNewTitle] = useState(title);

  const handleClick = (event : MouseEvent) => {
    if (event.detail === 2) {
      setIsDublClick(true);
    }
  };

  type EventChangeTitle = FormEvent<HTMLFormElement>
  | FocusEvent<HTMLInputElement> | null;

  const onTitleSubmit = async (
    event: EventChangeTitle = null,
    todoId: number,
  ) => {
    if (event) {
      event.preventDefault();
    }

    setIsDublClick(false);
    setloadingTodoId(todoId);

    if (!newTitle.trim()) {
      deleteTodo(todoId);
      setloadingTodoId(null);

      return;
    }

    try {
      await updatingTodoTitle(todoId, newTitle);
      changeTitle(todoId, newTitle);
    } catch {
      setErrorMessage('update todo');
    } finally {
      setloadingTodoId(null);
    }
  };

  const isEscape = (key: string, todoId: number) => {
    if (key === 'Escape') {
      onTitleSubmit(undefined, todoId);
    }
  };

  return (
    <div
      key={id}
      data-cy="Todo"
      className={
        classNames('todo',
          {
            completed,
          })
      }
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
          onClick={() => toggleStatusOnServer(id, completed)}
        />
      </label>
      {!isDoublClick
        ? (
          <span
            role="presentation"
            data-cy="TodoTitle"
            onClick={(event) => handleClick(event)}
            className="todo__title"
          >
            {newTitle}
          </span>
        )
        : (
          <form
            onSubmit={(event) => onTitleSubmit(event, id)}
          >
            <input
              type="text"
              className="todo__title-field"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              onBlur={(event) => onTitleSubmit(event, id)}
              onKeyDown={event => isEscape(event.key, id)}
            />
          </form>
        )}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
        onClick={() => deleteTodo(id)}
      >
        х
      </button>

      {loadingTodoid === id
      && (<Loader />)}
    </div>
  );
};
