/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Error } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { UserWarning } from './UserWarning';

export const App: React.FC = () => {
  const  [todos, setTodos] = useState<Todo[]>([]);
  const  [errorMessage, setErrorMessage] = useState('') ;
  const  [status,  setStatus] = useState(Status.All) ;
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  function getVisibleTodos(newTodos: Todo[], newStatus: Status) {
    switch (newStatus) {
      case Status.Active:
        return newTodos.filter(todo => !todo.completed);

      case Status.Completed:
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  }

  const visibleTodos = getVisibleTodos(todos, status);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
      <Header />
      <TodoList visibleTodos={visibleTodos} />
        {!!todos.length && (
          <Footer todos={todos} status={status} setStatus={setStatus} />
        )}
      </div>

      <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};
