/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './utils/todos';
import { NotificationText, SortCondition } from './types/enums';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

const USER_ID = '11161';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[] | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);
  const [filterBy, setFilterBy] = useState(SortCondition.All);
  const [activeItemsCount, setActiveItemsCount] = useState(0);
  const [completedItemsCount, setCompletedItemsCount] = useState(0);

  const [
    notificationMessage,
    setNotificationMessage,
  ] = useState<NotificationText | null>(null);

  function showNotification(text: NotificationText) {
    setNotificationMessage(text);

    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  }

  function filterTodos(allTodos: Todo[]) {
    let filteredTodos = allTodos;
    const activeTodos = filteredTodos.filter(todo => !todo.completed);
    const completedTodos = filteredTodos.filter(todo => todo.completed);

    if (filterBy === SortCondition.Active) {
      filteredTodos = activeTodos;
    } else if (filterBy === SortCondition.Completed) {
      filteredTodos = completedTodos;
    }

    setCompletedItemsCount(completedTodos.length);
    setActiveItemsCount(activeTodos.length);
    setVisibleTodos(filteredTodos);
  }

  useEffect(() => {
    if (todosFromServer) {
      filterTodos(todosFromServer);
    }
  }, [todosFromServer, filterBy]);

  useEffect(() => {
    setNotificationMessage(null);

    getTodos(USER_ID)
      .then(setTodosFromServer)
      .catch(() => {
        showNotification(NotificationText.Get);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {visibleTodos && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              filterCondition={filterBy}
              visibleItemsCount={activeItemsCount}
              isCompletedTodos={completedItemsCount > 0}
              setFilterCOndition={setFilterBy}
            />
          </>
        )}
      </div>

      {notificationMessage && (
        <Notification
          text={notificationMessage}
          hideNotification={() => setNotificationMessage(null)}
        />
      )}
    </div>
  );
};
