import React, { useState } from 'react';
import { addTodo } from '../../api/todos';
import { USER_ID } from '../../utils/user';
import { Todo } from '../../types/Todo';
import { ErrorMessages } from '../../types/ErrorMessages';

type Props = {
  handleTodosUpdate: (value: Todo) => void,
  setErrorMessage: (value: ErrorMessages) => void
  setLoadingTodoTitle: (value: string) => void,
};

export const TodoForm: React.FC<Props> = ({
  handleTodosUpdate,
  setErrorMessage,
  setLoadingTodoTitle,
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [loader, setLoader] = useState(false);

  const addNewTodo = (newTodo: Todo) => {
    handleTodosUpdate(newTodo);
    setTodoTitle('');
  };

  const resetLoaders = () => {
    setLoadingTodoTitle('');
    setLoader(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    setLoadingTodoTitle(todoTitle);

    const newTodo = {
      completed: false,
      title: todoTitle,
      userId: USER_ID,
    };

    addTodo(USER_ID, newTodo)
      .then(addNewTodo)
      .catch(() => setErrorMessage(ErrorMessages.UnableToAdd))
      .finally(resetLoaders);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={(event) => setTodoTitle(event.target.value)}
        disabled={loader}
      />
    </form>
  );
};
