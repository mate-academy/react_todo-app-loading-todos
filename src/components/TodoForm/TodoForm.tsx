import React, { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import { useError } from '../context/ErrorContext';
import { TodoError } from '../../types/enums';

export const TodoForm: React.FC = () => {
  const { addTodo } = useContext(TodosContext);
  const [inputTodo, setInputTodo] = useState('');

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
        aria-label="NewTodoField"
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
