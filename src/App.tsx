/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './components/UserWarning';
import { getTodos, USER_ID } from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotifications';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [valueError, setValueError] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [isNotificationHidden, setIsNotificationHidden] = useState(true);

  const autoHideNotification = () => {
    setTimeout(() => {
      setIsNotificationHidden(true);
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
        setValueError('Unable to load todos');
        setIsNotificationHidden(false);
        autoHideNotification();
      }
    };

    fetchData();
  }, []);

  const filteredTodos = todos.filter((todo: Todo) => {
    switch (filterBy) {
      case FilterBy.Active:
        return !todo.completed;
      case FilterBy.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleFilter = (selectedFilter: FilterBy) => {
    setFilterBy(selectedFilter);
  };

  const handleCloseNotifications = () => {
    setIsNotificationHidden(true);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} setTodos={setTodos} />

        {filteredTodos.length > 0 && <TodoList filteredTodos={filteredTodos} />}

        {todos.length > 0 && (
          <Footer todos={todos} filter={filterBy} onFilter={handleFilter} />
        )}
      </div>

      <ErrorNotification
        valueError={valueError}
        isNotificationHidden={isNotificationHidden}
        onClose={handleCloseNotifications}
      />
    </div>
  );
};
