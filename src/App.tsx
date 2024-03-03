/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { Errors } from './components/Errors';
import { Status } from './types/enums';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterSelected, setFilterSelected] = useState(Status.All);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorHidden, setErrorHidden] = useState(true);

  const showErrorCallback = useCallback(() => {
    setErrorHidden(false);

    const timeoutId = setTimeout(() => {
      setErrorHidden(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        showErrorCallback();
      });
  }, [showErrorCallback]);

  const filteredTodos = useMemo(() => {
    switch (filterSelected) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filterSelected, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const hasTodos = !!todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} setTodos={setTodos} />

        <Main todos={filteredTodos} />

        {hasTodos && (
          <Footer
            todos={todos}
            selected={filterSelected}
            setSelected={setFilterSelected}
          />
        )}
      </div>

      <Errors errorMessage={errorMessage} errorHidden={errorHidden} />
    </div>
  );
};
