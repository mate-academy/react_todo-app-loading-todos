/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { getVisibleTodos } from './utils/getVisibleTodos';
import { Filter } from './types/filter';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

const USER_ID = 6390;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [errorType, setErrorType] = useState('');

  useEffect(() => {
    const getTodosById = async () => {
      try {
        setError(false);
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (error) {
        setError(true);
        setErrorType('Oops..something is wrong');
      }
    };

    getTodosById();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = getVisibleTodos(todos, filter);
  const isThereCompleted = todos.some(todo => todo.completed);
  const activeTodosAmount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={visibleTodos} />
        {todos.length && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            activeTodosAmount={activeTodosAmount}
            isThereCompleted={isThereCompleted}
          />
        )}

      </div>

      {/* Add the 'hidden' class to hide the message smoothly */}
      {isError && (
        <ErrorMessage
          errorType={errorType}
          setError={setError}
        />
      )}
    </div>
  );
};
