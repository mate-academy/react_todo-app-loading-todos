import { useEffect } from 'react';

import { getTodos } from '../../api/todos';
import { filterTodos } from '../../helpers/filterTodos';
import { useTodosContext } from '../../hooks/useTodosContext';
import { Errors } from '../../enums/Errors';

import { Header } from '../Header';
import { TodoList } from '../TodoList';
import { Footer } from '../Footer';
import { ErrorNotification } from '../ErrorNotification';

export const TodoApp = () => {
  const { todos, setTodos, filter, setError, showError } = useTodosContext();

  const preparedTodos = filterTodos(todos, filter);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        showError(Errors.LoadTodos);
      });
  }, [setTodos, setError, showError]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList todos={preparedTodos} />
            <Footer />
          </>
        )}
      </div>

      <ErrorNotification />
    </div>
  );
};
