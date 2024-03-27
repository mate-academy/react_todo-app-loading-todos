/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessage, Notification } from './components/Notification';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [filterValue, setFilterValue] = useState('all');
  const timerId = useRef(0);

  function showError(message: ErrorMessage | null) {
    window.clearTimeout(timerId.current);

    setErrorMessage(message);

    if (!message) {
      return;
    }

    timerId.current = window.setTimeout(() => setErrorMessage(null), 3000);
  }

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        showError(ErrorMessage.load);
      });
  }, []);

  useMemo(() => {
    setFilteredTodos(
      todos.filter(todo =>
        filterValue === 'completed'
          ? todo.completed
          : filterValue === 'active'
            ? !todo.completed
            : true,
      ),
    );
  }, [filterValue, todos]);

  const onClearMessageHandler = () => {
    showError(null);
  };

  const onFilterHandler = (value: string) => {
    setFilterValue(value);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {!!todos.length && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              value={filterValue}
              itemsLeft={todos.filter(todo => !todo.completed).length}
              onFilter={onFilterHandler}
            />
          </>
        )}
      </div>

      <Notification
        message={errorMessage}
        onClearMessage={onClearMessageHandler}
      />
    </div>
  );
};
