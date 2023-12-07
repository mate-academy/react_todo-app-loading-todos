/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import * as postService from '../api/todos';
import { USER_ID } from '../utils/USER_ID';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');

  const {
    todos,
    setTodos,
    setErrorMessage,
  } = useTodos();

  const handletTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');

    setTitle(event.target.value.trimStart());
  };

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setErrorMessage('Title should not be empty');

      return;
    }

    setErrorMessage('');

    postService.addTodo(
      { title, completed: false, userId: USER_ID },
    ).then((newTodo) => {
      setTitle('');

      setTodos(prevTodos => {
        if (prevTodos) {
          return [...prevTodos, newTodo];
        }

        return null;
      });
    }).catch(() => {
      setErrorMessage('Unable to add a todo');
    });
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {!!todos?.length && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form
        onSubmit={(event) => addTodo(event)}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handletTitleChange}
        />
      </form>
    </header>
  );
};
