/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { List } from './components/List';
import { Todo } from './types/Todo';
import { ShowError } from './components/ShowError';
import * as todoService from './api/todos';
import { Status } from './types/Status';
import { TodoError } from './types/TodoError';

const USER_ID = 11926;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage]
    = useState<TodoError>(TodoError.ErrorOfLoad);
  const [isShowError, setIsShowError] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    todoService.getTodos(USER_ID)
      .then(items => {
        // eslint-disable-next-line no-console
        console.log(items); // Додайте цей рядок
        setTodos(items as Todo[]);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage(TodoError.ErrorOfLoad);
        setIsShowError(true);
        setLoading(false);
      });
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    const todoList = [...todos];

    switch (filterStatus) {
      case (Status.Active):
        return todoList.filter(todo => !todo.completed);

      case (Status.Completed):
        return todoList.filter(todo => todo.completed);

      default:
        return todoList;
    }
  }, [todos, filterStatus]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {loading ? (
          // Індікатор завантаження, якщо дані все ще завантажуються
          <p>Loading...</p>
        ) : (
          // Рендеримо компоненти тільки після завантаження даних
          <>
            <Header
              todos={todos}
            />
            <List todos={filteredTodos} />

            {/* Hide the footer if there are no todos */}
            {todos.length > 0 && (
              <Footer
                todos={todos}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />
            )}
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ShowError
        errorMessage={errorMessage}
        isShowError={isShowError}
        setIsShowError={setIsShowError}
      />
    </div>
  );
};
