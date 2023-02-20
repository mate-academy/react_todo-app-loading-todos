/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { UserWarning } from './UserWarning';

const USER_ID = 6398;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(TodoStatus.All);
  const [hasErrorNotification, setHasErrorNotification] = useState(true);

  const hideNotifications = () => setHasErrorNotification(false);
  const fetchAllTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setHasErrorNotification(true);
    }
  };

  useEffect(() => {
    fetchAllTodos();
    setTimeout(hideNotifications, 3000);
  }, []);

  let visibleTodos = [...todos];

  if (selectedStatus === TodoStatus.Active) {
    visibleTodos = todos.filter(todo => !todo.completed);
  }

  if (selectedStatus === TodoStatus.Completed) {
    visibleTodos = todos.filter(todo => todo.completed);
  }

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
          <AddTodoForm />
        </header>

        <section className="todoapp__main">

          {visibleTodos.map(todo => (
            <TodoList key={todo.id} todo={todo} />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {visibleTodos.length !== 0
          && (
            <Footer
              selectStatus={setSelectedStatus}
              selectedStatus={selectedStatus}
            />
          )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {hasErrorNotification
      && <Notification hideNotifications={hideNotifications} />}
    </div>
  );
};
