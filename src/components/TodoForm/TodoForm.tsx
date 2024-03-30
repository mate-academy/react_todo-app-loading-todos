/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useContext } from 'react';
import { TodosContext, TodosControlContext } from '../context/TodosContext';
import { useError } from '../context/ErrorContext';
import { TodoError } from '../../types/enums';

export const TodoForm: React.FC = () => {
  const { addTodo, setInputTodo } = useContext(TodosControlContext);
  const { inputTodo } = useContext(TodosContext);
  const { setErrorMessage } = useError();

  const handleSumbmitTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedInput = inputTodo.trim();

    if (!trimmedInput) {
      setErrorMessage(TodoError.NoTitle);

      return;
    }

    const newTodo = {
      id: 0,
      userId: 1,
      title: trimmedInput,
      completed: false,
    };

    setErrorMessage(null);
    addTodo(newTodo);
    setInputTodo('');
  };

  return (
    <form onSubmit={handleSumbmitTodo}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={inputTodo}
        onChange={event => setInputTodo(event.target.value)}
      />
    </form>
  );
};
