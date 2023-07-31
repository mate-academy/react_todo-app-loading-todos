/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-autofocus */
import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import { USER_ID } from '../utils/UserId';
import { client } from '../utils/fetchClient';

type Props = {
  todo: Todo;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  selectedTodo: Todo | null;
  updatedTitle: string;
  setSelectedTodo: (todo: Todo | null) => void;
  setErrorMessage: (err: string) => void;
  setUpdatedTitle: (title: string) => void;
  loadTodos: () => Promise<void>;
};

export const TodoItem:React.FC<Props> = ({
  todo,
  setTodos,
  selectedTodo,
  updatedTitle,
  setSelectedTodo,
  setErrorMessage,
  setUpdatedTitle,
  loadTodos,
}) => {
  const inputClickHandler = () => {
    setTodos(someTodos => {
      const newTodos = [...someTodos];
      // eslint-disable-next-line max-len
      const index = someTodos.findIndex(t => t.id === todo.id);
      const newTodo = { ...todo, completed: !todo.completed };

      newTodos.splice(index, 1, newTodo);

      return newTodos;
    });
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (updatedTitle.trim() === '') {
      setErrorMessage('Enter updated title');
    } else {
      setTodos(someTodos => {
        const newTodos = [...someTodos];
        // eslint-disable-next-line max-len
        const index = someTodos.findIndex(t => t.id === todo.id);
        const newTodo = {
          ...todo, title: updatedTitle, id: 0,
        };

        newTodos.splice(index, 1, newTodo);

        return newTodos;
      });

      client.patch(`/todos/${todo.id}?userId=${USER_ID}`, { title: updatedTitle })
        .then(loadTodos)
        .catch(() => setErrorMessage('Can\'t update a todo'));

      setSelectedTodo(null);
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUpdatedTitle(event.target.value);
  };

  const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.preventDefault();
    setErrorMessage('');

    if (updatedTitle.trim() === '') {
      setErrorMessage('Enter updated title');
    } else {
      setTodos(someTodos => {
        const newTodos = [...someTodos];
        // eslint-disable-next-line max-len
        const index = someTodos.findIndex(t => t.id === todo.id);
        const newTodo = {
          ...todo, title: updatedTitle, id: 0,
        };

        newTodos.splice(index, 1, newTodo);

        return newTodos;
      });

      client.patch(`/todos/${todo.id}?userId=${USER_ID}`, { title: updatedTitle })
        .then(loadTodos)
        .catch(() => setErrorMessage('Can\'t update a todo'));

      setSelectedTodo(null);
    }
  };

  const divDblClickHandler = () => {
    setSelectedTodo(todo);
    setUpdatedTitle(todo.title);
  };

  const buttonClickHandler = () => {
    client.delete(`/todos/${todo.id}?userId=${USER_ID}`);
    setTodos(someTodos => {
      const filteredTodos = [...someTodos].filter(t => t.id !== todo.id);

      return filteredTodos;
    });
  };

  return (
    <div
      className={classNames('todo',
        { completed: todo.completed })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={inputClickHandler}
        />
      </label>
      {selectedTodo === todo
        ? (
          <form onSubmit={formSubmitHandler}>
            <input
              type="text"
              className="todo__title-field"
              placeholder="Todo title can't be empty"
              value={updatedTitle}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
              autoFocus
            />
          </form>
        ) : (
          <div
            className="todo__title"
            onDoubleClick={divDblClickHandler}
          >
            {todo.id !== 0
              ? todo.title
              : (
                <span className="loader" />
              )}
          </div>
        )}
      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        onClick={buttonClickHandler}
      >
        ×
      </button>
    </div>
  );
};
