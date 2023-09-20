import React, { useState } from 'react';
import { addTodo } from '../../api/todos';
import { USER_ID } from '../../utils/user';
import { Todo } from '../../types/Todo';
import { ErrorMessages } from '../../types/ErrorMessages';
import { UseTodosContext } from '../../utils/TodosContext';

type Props = {};

export const TodoForm: React.FC<Props> = () => {
  const context = UseTodosContext();
  const {
    setTodos,
    setErrorMessage,
    setTitleOfLoadingTodo,
  } = context;

  const handleTodosUpdate = (newTodo: Todo) => {
    setTodos(prevState => [...prevState, newTodo]);
  };

  const [todoTitle, setTodoTitle] = useState('');
  const [loader, setLoader] = useState(false);

  const addNewTodo = (newTodo: Todo) => {
    handleTodosUpdate(newTodo);
    setTodoTitle('');
  };

  const resetLoaders = () => {
    setTitleOfLoadingTodo('');
    setLoader(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    setTitleOfLoadingTodo(todoTitle);

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
        data-cy="NewTodoField"
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
