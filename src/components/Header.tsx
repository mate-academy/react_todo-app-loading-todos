import React, { SetStateAction, useState } from 'react';
import { Todo } from '../types/Todo';
import { addTodo } from '../api/todos';

type Props = {
  setTodos:(todos:SetStateAction<Todo[]>) => void;
  setErrorMessage:(message:string) => void;
  setIsError:(isError:boolean) => void;
  ID:number;
};

export const Header:React.FC<Props> = ({
  setTodos,
  setErrorMessage,
  setIsError,
  ID,
}) => {
  const [title, setTitle] = useState('');

  const handleChangeTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setErrorMessage('Title should not be empty');
      setIsError(true);

      return;
    }

    const newTodo = {
      id: +Date.now(),
      userId: ID,
      title,
      completed: false,
    };

    addTodo(newTodo).then(
      (createdTodo) => setTodos((prev) => [...prev, createdTodo]),
    ).catch(() => {
      setErrorMessage('Unable to add todo');
      setIsError(true);
    }).finally(() => {
      setTitle('');
    });
  };

  return (
    <header className="todoapp__header">

      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form
        onSubmit={handleFormSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChangeTitle}
        />
      </form>
    </header>
  );
};
