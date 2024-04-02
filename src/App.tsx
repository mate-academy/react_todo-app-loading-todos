import React, { useEffect, useState } from 'react';
import { USER_ID, getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Progress } from './types/Progress';
import { prepareTodos } from './utils/prepareTodos';
import { wait } from './utils/fetchClient';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterField, setFilterField] = useState<Progress>(Progress.All);

  const filteredTodos = prepareTodos(todos, filterField);
  const activeTodosAmount = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Something went wrong');

        return wait(3000).then(() => setErrorMessage(''));
      });

    return () => {
      setErrorMessage('');
    };
  }, []);

  const handleErrorClose = () => {
    setErrorMessage('');
  };

  const handleFilterField = (status: Progress) => {
    setFilterField(status);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && <TodoList todos={filteredTodos} />}
        {todos.length > 0 && (
          <Footer
            activeTodosAmount={activeTodosAmount}
            filterField={filterField}
            handleFilterField={handleFilterField}
          />
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        handleErrorClose={handleErrorClose}
      />
    </div>
  );
};
