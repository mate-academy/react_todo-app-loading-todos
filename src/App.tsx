/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { Footer } from './components/Footer';
import { Notifications } from './components/Notifications';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/FilterType';
import { getFilteredTodos } from './utils/TodoFilter';
import { NOTIFICATION } from './types/Notification';

const USER_ID = 11141;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [notification, setNotification] = useState(NOTIFICATION.CLEAR);

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
      }).catch(() => setNotification(NOTIFICATION.LOAD));
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    return getFilteredTodos(todos, filterType);
  }, [todos, filterType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <Form todos={filteredTodos} />
        </header>

        <TodoList todos={filteredTodos} />

        {todos.length !== 0
          && (
            <Footer
              todos={todos}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          )}
      </div>

      {notification !== NOTIFICATION.CLEAR
        && (
          <Notifications
            notification={notification}
          />
        )}
    </div>
  );
};
