/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import { getTodos } from './api/todos';

import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from
  './components/ErrorNotification/ErrorNotification';

import { Todo } from './types/Todo';
import { FilterTypes } from './types/FilterTypes';
import { filterTodosByCompleted } from './helpers/helpers';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedFilter, setCompletedFilter] = useState(FilterTypes.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          setErrorMessage('Can\'t load todos');
        });
    }
  }, [user]);

  if (errorMessage) {
    setTimeout(() => setErrorMessage(''), 3000);
  }

  const closeErrorMessage = () => {
    setErrorMessage('');
  };

  const visibleTodos = filterTodosByCompleted(todos, completedFilter);

  const uncompletedTodosAmount = visibleTodos.filter(
    todo => !todo.completed,
  ).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              uncompletedTodosAmount={uncompletedTodosAmount}
              completedFilter={completedFilter}
              onFilterButtonClick={setCompletedFilter}
            />
          </>

        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          onCloseMessage={closeErrorMessage}
        />
      )}
    </div>
  );
};
