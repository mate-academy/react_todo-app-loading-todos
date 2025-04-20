import React, { ChangeEvent, RefObject, useState } from 'react';
import { postTodo, USER_ID } from '../../api/todos';
import { Todo } from '../../types/Todo';

type Props = {
  elementFocus: RefObject<HTMLInputElement>;
  setErrorMessage: (message: string) => void;
};

export const FormField: React.FC<Props> = ({
  elementFocus,
  setErrorMessage,
}) => {
  const [formText, setFormText] = useState('');

  const newTodo: Todo = {
    id: 0,
    title: formText.trim(),
    completed: false,
    userId: USER_ID,
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formText.trim()) {
      setErrorMessage('Title should not be empty');

      return;
    }

    postTodo(newTodo)
      .then(() => {})
      .catch(() => {});
  };

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormText(e.target.value);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form onSubmit={addTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={elementFocus}
          value={formText}
          onChange={changeHandle}
        />
      </form>

      {/* Add a todo on form submit */}
    </header>
  );
};
