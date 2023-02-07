/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { Todos } from './components/Todos';
import { FilterOptions } from './types/FilterOptions';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6133;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [notification, setNotification] = useState('');
  const [hideNotification, setHideNotification] = useState(false);

  const handleHideNotification = () => setHideNotification(true);
  const handleError = (error: string) => {
    setNotification(error);
    setTimeout(() => {
      setHideNotification(true);
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(loadedTodos => {
        setTodos(loadedTodos);
      }).catch(() => {
        handleError('Unable to load Todos');
      });
  }, []);

  const filteredTodos = todos.filter(({
    completed,
  }) => {
    const filters: FilterOptions = {
      all: true,
      completed,
      active: !completed,
    };

    return filters[filter];
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <Todos todos={filteredTodos} />
        <Footer
          todos={todos}
          currentFilter={filter}
          setFilter={setFilter}
        />
      </div>

      {/* Added following button for testing/review behaviour, removing on next tasks */}
      <button
        type="button"
        className="button is-warning active mb-2"
        onClick={() => handleError('in case of error, this behaviour...')}
      >
        test error notification
      </button>

      <Notification
        message={notification}
        hidden={hideNotification}
        setHidden={handleHideNotification}
      />
    </div>
  );
};
