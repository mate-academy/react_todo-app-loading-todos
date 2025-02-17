/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import { FilterParams } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [, setIsLoading] = useState(true);

  const [filterParams, setFilterParams] = useState<FilterParams>(
    FilterParams.All,
  );

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setIsLoading(false))
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const getVisibleTodos = () => {
    return todos.filter(todo => {
      switch (filterParams) {
        case FilterParams.Active:
          return !todo.completed;
        case FilterParams.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  };

  const visibleTodos: Todo[] = getVisibleTodos();

  const itemsLeft = todos.filter(item => item.completed === false).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList
          todos={visibleTodos}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            setFilterParams={setFilterParams}
            filterParams={filterParams}
            itemsLeft={itemsLeft}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage error={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};
