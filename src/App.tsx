/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Status } from './types/Status';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);
  const allTodosAreActive =
    todos.length > 0 && todos.every(todo => todo.completed);

  const visibleTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Status.All:
        return true;

      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header allTodosAreActive={allTodosAreActive} />

        <TodoList visibleTodos={visibleTodos} />

        {todos.length > 0 && (
          <Footer
            activeTodos={activeTodos}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            completedTodos={completedTodos}
          />
        )}
      </div>

      <Notification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
