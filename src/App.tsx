/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { FilterOptions } from './components/TodoFilter/TodoFilter';
import {
  ErrorNotification,
  Errors,
} from './components/Error/ErrorNotification';
import { TodoFooter } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const handleFilteredTodos = (
    todos: Todo[],
    filterSelected: FilterOptions,
  ) => {
    switch (filterSelected) {
      case FilterOptions.active:
        return todos.filter(todo => !todo.completed);
      case FilterOptions.completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [filterSelected, setFilterSelected] = useState<FilterOptions>(
    FilterOptions.all,
  );

  const preparedTodos = handleFilteredTodos(todos, filterSelected);
  const activeTodos = handleFilteredTodos(todos, FilterOptions.active);
  const completedTodos = handleFilteredTodos(todos, FilterOptions.completed);

  const toggleTodo = (todoId: number, completed: boolean) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed } : todo,
      ),
    );
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={preparedTodos} toggleTodo={toggleTodo} />

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
