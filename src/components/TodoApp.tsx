import { useEffect, useState } from 'react';
import { getTodos } from '../api/todos';
import { Todo } from '../types/Todo';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';
import { TodoFooter } from './TodoFooter';
import { Errors } from '../enums/Errors';
import { ErrorNotification } from './ErrorNotification';
import { FilteredTodos } from '../enums/FilteredTodos';
import React = require('react');

const handleFilteredTodos = (todos: Todo[], filterSelected: FilteredTodos) => {
  switch (filterSelected) {
    case FilteredTodos.active:
      return todos.filter(todo => !todo.completed);
    case FilteredTodos.completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [filterSelected, setFilterSelected] = useState<FilteredTodos>(
    FilteredTodos.all,
  );

  const preparedTodos = handleFilteredTodos(todos, filterSelected);
  const activeTodos = handleFilteredTodos(todos, FilteredTodos.active);
  const completedTodos = handleFilteredTodos(todos, FilteredTodos.completed);

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
    getTodos()
      .then(setTodos)
      .catch(() => showError(Errors.LoadTodos));
  }, []);
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader preparedTodos={preparedTodos} />

        <TodoList preparedTodos={preparedTodos} />

        {todos.length > 0 && (
          <TodoFooter
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
            activeTodos={activeTodos}
            completedTodos={completedTodos}
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
