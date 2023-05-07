/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';

import { Status, ErrorMessage } from './types';
import { TodoForm } from './components/TodoForm';
import { TodoFooter } from './components/TodoFooter';
import { TodoError } from './components/TodoError';
import { TodosContext } from './components/TodosContext/TodosContext';

const USER_ID = 10238;

export const App: FC = () => {
  const {
    todos,
    setTodos,
    error,
    setError,
    filterStatus,
  } = useContext(TodosContext);

  useEffect(() => {
    setError(null);

    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
      })
      .catch((fetchingError: Error) => {
        setError(ErrorMessage.Load);
        throw new Error(fetchingError.message);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filterStatus === Status.Active) {
        return !todo.completed;
      }

      if (filterStatus === Status.Completed) {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filterStatus]);

  const activeTodosCount = visibleTodos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm activeTodosCount={activeTodosCount} />

        {todos.length > 0 && (
          <>
            <TodoList visibleTodos={visibleTodos} />
            <TodoFooter activeTodosCount={activeTodosCount} />
          </>
        )}
      </div>

      {error && (
        <TodoError />
      )}
    </div>
  );
};
