/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { Notification } from './Components/Notiifcation';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { FilterType } from './types/Filter';
import { ErrorMessage } from './types/ErrorMessage';

const USER_ID = 13;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterType.ALL);
  const [isError, setIsError] = useState(false);
  const [errorMessege, setErrorMessege] = useState('' as ErrorMessage);

  useEffect(() => {
    client.get<Todo[]>('/todos?userId=13')
      .then(setTodos)
      .catch(() => {
        setIsError(true);
        setErrorMessege(ErrorMessage.CANNOT_LOAD_TODOS);
      });
  }, [todos]);

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
        {itemsLeft !== 0 && (
          <Footer
            setFilter={setFilter}
            itemsLeft={itemsLeft}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {isError && (<Notification errorMessege={errorMessege} />)}
    </div>
  );
};
