/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { CurrentError } from './types/CurrentError';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { ErrorNotification } from
  './components/ErrorNotification/ErrorNotification';
import { TodoFilter } from './types/TodoFilter';
import { filterTodos } from './utils/filter';

const USER_ID = 11535;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState<TodoFilter>(TodoFilter.All);
  const [errorMessage, setErrorMessage] = useState(CurrentError.Default);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(CurrentError.LoadingError);
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(CurrentError.Default);
      }, 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    const prepTodos = filterTodos(todos, todoFilter);

    setFilteredTodos(prepTodos);
  }, [todos, todoFilter]);

  const handleSetTodoFilter = (filter: TodoFilter) => (

    setTodoFilter(filter)
  );

  const hideErros = () => {
    setErrorMessage(CurrentError.Default);
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader activeTodosCount={activeTodosCount} />

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <Footer
            filter={todoFilter}
            setFilter={handleSetTodoFilter}
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification errorMessage={errorMessage} hideErros={hideErros} />
    </div>
  );
};
