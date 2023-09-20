/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodosList } from './components/TodosList/TodosList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { filteredTodos } from './helpers/filteredTodos';
import { SortType } from './types/SortType';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { ERROR_MESSAGES } from './utils/ERROR_MESSAGES';

const USER_ID = 11542;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectFilter, setSelectFilter] = useState(SortType.All);

  const clearCompleteStatusButton = todos.some((todo) => todo.completed);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(() => setErrorMessage(ERROR_MESSAGES.unableToLoadTodos));
  }, []);

  setTimeout(() => {
    setErrorMessage('');
  }, 3000);

  const preparedTodos = filteredTodos(todos, selectFilter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodosList todos={preparedTodos} />

        {todos.length > 0 && (
          <Footer
            selectFilter={selectFilter}
            setSelectFilter={setSelectFilter}
            todos={todos}
            clearCompleteStatusButton={clearCompleteStatusButton}
          />
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
