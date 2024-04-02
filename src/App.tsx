/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { USER_ID, getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Error } from './components/Error';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { FilterBy } from './types/FilterBy';
import { wait } from './utils/fetchClient';

const getFilteredTodos = (todos: Todo[], filterBy: FilterBy): Todo[] => {
  switch (filterBy) {
    case FilterBy.All:
      return todos;
    case FilterBy.Active:
      return todos.filter(todo => !todo.completed);
    case FilterBy.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorText, setErrorText] = useState<Errors>(Errors.NoError);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  useEffect(() => {
    getTodos().then(
      data => {
        wait(150).then(() => setTodos(data));
      },
      () => {
        setErrorText(Errors.Loading);
        wait(3000).then(() => setErrorText(Errors.NoError));
      },
    );
  }, []);

  const preparedTodos = getFilteredTodos(todos, filterBy);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleFilterByClick = (filterByValue: FilterBy) => {
    setFilterBy(filterByValue);
  };

  const handleHideError = () => {
    setErrorText(Errors.NoError);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main todos={preparedTodos} />

        {!!todos.length && (
          <Footer
            onFilterByClick={handleFilterByClick}
            todos={todos}
            filterBy={filterBy}
          />
        )}
      </div>

      <Error errorText={errorText} onHideError={handleHideError} />
    </div>
  );
};
