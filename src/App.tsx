import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export enum FilterType {
  All = 'all',
  Active = 'active',
  Complited = 'complited',
}

function getVisibleTodos(todos: Todo[], filter: string) {
  let newTodosList = [...todos];

  if (filter) {
    switch (filter) {
      case FilterType.Active:
        newTodosList = newTodosList.filter(todo => !todo.completed);
        break;
      case FilterType.Complited:
        newTodosList = newTodosList.filter(todo => todo.completed);
        break;
      case FilterType.All:
      default:
        break;
    }
  }

  return newTodosList;
}

function getActiveTodosCounter(todos: Todo[]) {
  return todos.filter(todo => !todo.completed).length;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  const showError = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleHideError = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(() => showError('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos: Todo[] = getVisibleTodos(todos, filter);
  const activeTodosCounter = getActiveTodosCounter(todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && (
          <Footer
            setFilter={setFilter}
            filter={filter}
            activeTodosCounter={activeTodosCounter}
          />
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} onHide={handleHideError} />
    </div>
  );
};
