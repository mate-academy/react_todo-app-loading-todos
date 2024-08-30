/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { Footer } from './components/footer/footer';
import { ErrorNotification } from './components/error/error';
import { TodoFilter } from './types/filter';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { handleFilter } from './utils/FilterFunction';
import { Error } from './types/error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortFilter, setSortFilter] = useState<TodoFilter>(TodoFilter.filter);
  const [errorMessage, setErrorMessage] = useState('');

  const areTodosActive =
    todos.every(todo => todo.completed) && todos.length > 0;
  const prepared = handleFilter(todos, sortFilter);
  const activeCounter = todos.filter(todo => !todo.completed).length;
  const notActiveCounter = todos.filter(todo => todo.completed).length;

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(Error.GET));

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header areTodosActive={areTodosActive} />
        <Main todos={prepared} />

        {!!todos.length && (
          <Footer
            sortFilter={sortFilter}
            setSortFilter={setSortFilter}
            activeCounter={activeCounter}
            notActiveCounter={notActiveCounter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
