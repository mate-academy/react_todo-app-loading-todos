/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Dispatch, SetStateAction } from 'react';
import { USER_ID } from '../utils/UserId';
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: (err: string) => void;
  inputTitle: string;
  setInputTitle: (title: string) => void;
  loadTodos: () => Promise<void>;
};

/* eslint-disable max-len */
export const Header:React.FC<Props> = ({
  setTodos,
  setErrorMessage,
  inputTitle,
  loadTodos,
  setInputTitle,
}) => {
  const clickHandler = () => {
    setTodos((someTodos: Todo[]) => {
      const newTodos = [...someTodos]
        .map(todo => {
          const isSomeComplited = [...someTodos]
            .filter(someTodo => someTodo.completed).length !== someTodos.length;

          if (isSomeComplited) {
            return { ...todo, completed: true };
          }

          return { ...todo, completed: false };
        });

      return newTodos;
    });
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (inputTitle.trim() === '') {
      setErrorMessage('Enter a title');
    } else {
      setTodos((prevTodos: Todo[]) => [...prevTodos, {
        id: 0, title: inputTitle, completed: false, userId: USER_ID,
      }]);
      client.post(`/todos?userId=${USER_ID}`, { title: inputTitle, completed: false, userId: USER_ID })
        .then(loadTodos)
        .catch(() => setErrorMessage('Can\'t load a todo'));

      setInputTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        onClick={clickHandler}
      />

      {/* Add a todo on form submit */}
      <form
        onSubmit={formSubmitHandler}
      >
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setInputTitle(event.target.value)}
          value={inputTitle}
        />
      </form>
    </header>
  );
};
