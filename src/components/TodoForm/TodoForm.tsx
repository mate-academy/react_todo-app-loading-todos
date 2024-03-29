/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useContext } from 'react';
import { TodosControlContext } from '../context/TodosContext';
import { useError } from '../context/ErrorContext';

type Props = {
  inputTodo: string;
  setInputTodo: (value: string) => void;
};

export const TodoForm: React.FC<Props> = ({ inputTodo, setInputTodo }) => {
  const { addTodo } = useContext(TodosControlContext);
  const { setErrorMessage } = useError();

  const handleSumbmitTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputTodo.trim()) {
      setErrorMessage('Title should not be empty');

      return;
    }

    const newTodo = {
      id: 0,
      userId: 1,
      title: inputTodo.trim().length ? inputTodo.trim() : 'error',
      completed: false,
    };

    setErrorMessage('');
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
