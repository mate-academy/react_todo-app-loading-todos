/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
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
import { FilterType } from './types/FilterType';
import { filterTodosByCompleted } from './helpers/helpers';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedFilter, setCompletedFilter] = useState(FilterType.ALL);
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

  const removeErrorMessage = () => {
    setErrorMessage('');
  };

  if (errorMessage) {
    setTimeout(() => removeErrorMessage(), 3000);
  }

  const visibleTodos = useMemo(() => {
    return filterTodosByCompleted(todos, completedFilter);
  }, [todos, completedFilter]);

  const activeTodosAmount = useMemo(() => {
    return visibleTodos.filter(todo => !todo.completed).length;
  }, [visibleTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              activeTodosAmount={activeTodosAmount}
              completedFilter={completedFilter}
              setCompletedFilter={setCompletedFilter}
            />
          </>

        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          removeErrorMessage={removeErrorMessage}
        />
      )}
    </div>
  );
};
