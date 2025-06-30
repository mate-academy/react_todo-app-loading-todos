/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { FilterType } from './types/Filter';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

function getVisibleTodos(todos: Todo[], filter: string) {
  let visibleTodos = [...todos];

  if (filter) {
    switch (filter) {
      case FilterType.Active:
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;
      case FilterType.Completed:
        visibleTodos = visibleTodos.filter(todo => todo.completed);
        break;
      case FilterType.All:
      default:
        break;
    }
  }

  return visibleTodos;
}

function getCountActiveTodos(todos: Todo[]) {
  return todos.filter(todo => !todo.completed).length;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(FilterType.All);

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos: Todo[] = getVisibleTodos(todos, filter);
  const countOfActiveTodos = getCountActiveTodos(todos);
  const countOfCompletedTodos = todos.filter(todo => todo.completed).length;

  const onCloseError = () => {
    setErrorMessage('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          loading={false} // sau adaugă o stare loading dacă ai
        />
        <TodoList
          todos={visibleTodos}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          loading={false} // sau înlocuiește cu starea reală de încărcare
        />
        {todos.length > 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            countOfActiveTodos={countOfActiveTodos}
            countOfCompletedTodos={countOfCompletedTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        onCloseError={onCloseError}
      />
    </div>
  );
};
