import React, { FC, useContext, useState } from 'react';
import { getTodos, sendNewTodo } from '../../api/todos';
import { AppTodoContext } from '../AppTodoContext/AppTodoContext';
import { ErrorType } from '../Error/Error.types';
import { USER_ID } from '../../react-app-env';

export const NewTodoForm: FC = () => {
  const {
    setTodos,
    setErrorMessage,
    setTodosCount,
  } = useContext(AppTodoContext);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleAddingTodoOnAPI = async () => {
    try {
      await sendNewTodo(inputValue, USER_ID);

      const allTodos = await getTodos(USER_ID);

      setTodos(allTodos);
      setTodosCount(allTodos.length);
    } catch {
      setErrorMessage(ErrorType.getTodosError);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validatedValue = inputValue.trim();

    if (validatedValue === '') {
      setErrorMessage(ErrorType.InputError);

      return;
    }

    setErrorMessage(ErrorType.NoError);
    handleAddingTodoOnAPI();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(event) => handleInputChange(event.target.value)}
      />
    </form>
  );
};
