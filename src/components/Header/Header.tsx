import React, { FC, useState } from 'react';
import { createNewTodo } from '../../api/todos';
import { USER_ID } from '../../constants';
import { ErrorType } from '../../types/Error';

type Props = {
  setError: React.Dispatch<React.SetStateAction<ErrorType>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: FC<Props> = ({ setError, setLoading }) => {
  const [newTodoQuery, setNewTodoQuery] = useState('');

  const handleOnNewTodoInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setError(ErrorType.NONE);
    setNewTodoQuery(event.target.value);
  };

  const onEnterPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      if (!newTodoQuery.trim()) {
        setError(ErrorType.EMPTY);

        return;
      }

      try {
        setLoading(true);
        createNewTodo(USER_ID, newTodoQuery);
        setNewTodoQuery('');
      } catch (err) {
        setError(ErrorType.ADD);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="button" className="todoapp__toggle-all active" />

      {/* Add a todo on form submit */}
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoQuery}
          onChange={handleOnNewTodoInputChange}
          onKeyPress={onEnterPress}
        />
      </form>
    </header>
  );
};
