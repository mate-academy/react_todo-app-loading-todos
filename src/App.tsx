import React, { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';
import { Header } from './components/Header';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotice } from './types/ErrorNotice';
import { Filter } from './types/Filter';

const USER_ID = 6762;

export const App: React.FC = () => {
  const [todosFromServer, setTodos] = useState<Todo[] | null>(null);
  const [hasError, setError] = useState(false);
  const [errorMessage, setMessageError] = useState('');
  const [filter, setFilter] = useState(Filter.ALL);

  const showError = (message: string) => {
    setError(true);
    setMessageError(message);
    setTimeout(setError, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => showError(ErrorNotice.LOADING));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todosFromServer?.filter(todo => {
    switch (filter) {
      case Filter.ACTIVE:
        return !todo.completed;

      case Filter.COMPLETED:
        return todo.completed;

      default:
        return todo;
    }
  });
  //   try {
  //     const todos = await getTodos(USER_ID);

  //     console.log(todos);
  //     // if (todos) {
  //     //   setTodos(todos);
  //     // }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {visibleTodos && <TodoList todos={visibleTodos} />}

        {todosFromServer && (
          <Footer
            filter={filter}
            onFilter={setFilter}
          />
        )}
      </div>
      <Notification
        error={hasError}
        errorNotice={errorMessage}
        hasError={setError}
      />
    </div>
  );
};
