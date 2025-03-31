import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as clientData from './api/todos';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Error, FilterBy, Todo } from './types/Todo';
import { ErrorNotification } from './components/Error/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodo, setFilterTodo] = useState<string>(FilterBy.ALL);
  const [errorMessage, setErrorMessage] = useState<Error>(Error.DEFAULT);
  const [isLoading, setIsLoading] = useState(true);

  function getClientData() {
    setIsLoading(true);

    clientData
      .getTodos()
      .then(data => {
        setTodos(data);
        setErrorMessage(Error.DEFAULT);
      })
      .catch(() => {
        setErrorMessage(Error.LOAD);
        setTimeout(() => setErrorMessage(Error.DEFAULT), 3000);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(getClientData, []);

  const filteredByCompleted = todos.filter(todo => {
    switch (filterTodo) {
      case FilterBy.ACTIVE:
        return !todo.completed;

      case FilterBy.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  });

  const notCompletedTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodoCount = todos.filter(todo => todo.completed).length;

  if (!clientData.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header countItemsCompleted={notCompletedTodosCount} />
        {!isLoading ? (
          <TodoList todos={filteredByCompleted} />
        ) : (
          <div>Loading...</div>
        )}

        {todos.length > 0 && (
          <Footer
            countItemsCompleted={notCompletedTodosCount}
            countItemsNotCompleted={completedTodoCount}
            setFilterTodo={setFilterTodo}
            filterTodo={filterTodo}
          />
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
