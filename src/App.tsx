/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Errors } from './components/Errors/Errors';
import { Todo } from './types/Todo';
import { IsActiveError, IsActiveLink } from './types/types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [link, setLink] = useState(IsActiveLink.All);
  const [isError, setIsError] = useState(IsActiveError.NoError);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setIsError(IsActiveError.Load);
      });
  }, []);

  const visibleTodos = React.useMemo(() => {
    return todos.filter(todo => {
      if (link === IsActiveLink.Active) {
        return !todo.completed;
      } else if (link === IsActiveLink.Completed) {
        return todo.completed;
      }

      return todo;
    });
  }, [link, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} setTodos={setTodos} setIsError={setIsError} />

        {todos.length > 0 && (
          <>
            <Main
              filteredTodos={visibleTodos}
              todos={todos}
              setTodos={setTodos}
            />
            <Footer todos={todos} link={link} setLink={setLink} />
          </>
        )}
      </div>

      <Errors isError={isError} setIsError={setIsError} />
    </div>
  );
};
