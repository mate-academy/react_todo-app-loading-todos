import React, { FormEvent, useEffect, useState } from 'react';
import { getTodos } from '../../api/todos';
import { TodoForm } from '../TodoForm/TodoForm';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { TodoFooter } from '../TodoFooter/TodoFooter';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';
import { Errors } from '../../enums/Errors';
import { FilterOptions } from '../../enums/FilteredTodo';
import { hendleFilteredTodos } from '../../helpers/hendleFilteredTodos';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [filterSelected, setFilterSelected] = useState<FilterOptions>(
    FilterOptions.all,
  );

  const preparedTodos = hendleFilteredTodos(todos, filterSelected);
  const activeTodos = hendleFilteredTodos(todos, FilterOptions.active);
  const completedTodos = hendleFilteredTodos(todos, FilterOptions.completed);

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const showError = (error: Errors) => {
    setErrorMessage(error);

    setTimeout(() => {
      clearErrorMessage();
    }, 3000);
  };

  useEffect(() => {
    clearErrorMessage();
    getTodos()
      .then(setTodos)
      .catch(() => {
        showError(Errors.LoadTodos);
      });
  }, []);

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm addTodo={addTodo} />

        <TodoList todos={preparedTodos} />

        {todos.length > 0 && (
          <TodoFooter
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        clearErrorMessage={clearErrorMessage}
      />
    </div>
  );
};
