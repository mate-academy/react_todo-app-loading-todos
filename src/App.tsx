/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/Filter';
import { ErrorMessage } from './types/ErrorMessage';

const USER_ID = 35;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.NONE);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.CANNOT_LOAD_TODOS);
        setTimeout(() => setErrorMessage(ErrorMessage.NONE), 3000);
      });
  }, []);

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case FilterType.ACTIVE:
        return !todo.completed;
      case FilterType.COMPLETED:
        return todo.completed;
      case FilterType.ALL:
      default:
        return true;
    }
  });

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const closeErrorMsg = () => {
    setErrorMessage(ErrorMessage.NONE);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            itemsLeft={itemsLeft}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notification errorMessage={errorMessage} close={closeErrorMsg} />
    </div>
  );
};
