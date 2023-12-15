/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { filteredTodoList } from './helpers';
import { Errors } from './components/Errors/Errors';
import { ErrorType } from './types/ErorTypes';

const USER_ID = 12036;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState('');
  const [errorType, setErorType] = useState<ErrorType | null>(null);
  const [isErrorMessage, setIsErrorMessage] = useState(true);

  const preparedTodos = filteredTodoList(todos, filterBy);

  const loader = useCallback(() => {
    setErorType(null);
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErorType(ErrorType.LoadError);
      });
  }, []);

  useEffect(() => {
    loader();
  }, [loader]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {preparedTodos && (
          <TodoList
            todos={preparedTodos}
          />
        )}
        {todos && (
          <Footer
            onFilter={setFilterBy}
            todos={preparedTodos}
            filterBy={filterBy}
          />
        )}
      </div>
      {isErrorMessage
        && (
          <Errors
            error={errorType}
            onError={setIsErrorMessage}
          />
        )}
    </div>
  );
};
