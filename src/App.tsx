/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { SelectStatus } from './types/SelectStatus';
import { TodoError } from './types/TodoError';
import { ErrorTab } from './components/ErrorTab';
import { getTodos } from './api/todos';

const USER_ID = 11123;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(SelectStatus.All);
  const [errorMesage, setErrorMesage] = useState(TodoError.empty);

  useEffect(() => {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(todos => setTodosFromServer(todos))
      .catch(() => setErrorMesage(TodoError.load));
  }, []);

  useEffect(() => {
    getTodos(USER_ID)
      .then(allTodos => setTodosFromServer(allTodos))
      .catch(() => setErrorMesage(TodoError.load));
  }, []);

  const getFilteredTodos = (todos: Todo[]) => {
    const filteredTodos = [...todos];

    switch (selectedStatus) {
      case SelectStatus.Active:
        return filteredTodos.filter(todo => !todo.completed);

      case SelectStatus.Completed:
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={getFilteredTodos(todosFromServer)} />
        <Main
          todos={getFilteredTodos(todosFromServer)}
          setErrorMesage={setErrorMesage}
        />
        {todosFromServer.length > 0
          && (
            <Footer
              todos={getFilteredTodos(todosFromServer)}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          )}
      </div>
      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMesage && (
        <ErrorTab
          errorMesage={errorMesage}
          setErrorMesage={setErrorMesage}
        />
      )}
    </div>
  );
};
