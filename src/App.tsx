/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';
import { SortTypes } from './types/SortTypes';
import { Error } from './types/Error';

const USER_ID = 10320;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<SortTypes>(SortTypes.All);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);

  const handleError = () => {
    setErrorMessage(Error.LOAD);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const loadTodos = async () => {
    try {
      const response = await getTodos(USER_ID);

      setTodos(response);
    } catch (error: unknown) {
      handleError();
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const vissibleTodos = todos.filter((todo) => {
    switch (activeFilter) {
      case SortTypes.Active:
        return !todo.completed;

      case SortTypes.Completed:
        return todo.completed;

      default: return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header />
        <TodoList todos={vissibleTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={vissibleTodos}
            onChangeFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <Notification errorMessage={errorMessage} />
      )}
    </div>
  );
};
