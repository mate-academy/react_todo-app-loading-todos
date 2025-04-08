/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Errors } from './types/Errors';
import { Footer } from './components/Footer';
import { ErrorModal } from './components/ErrorModal';
import { FilterBy } from './types/FilterBy';
import { Loader } from './components/Loader';

const filter = (todos: Todo[], filterBy: FilterBy) => {
  switch (filterBy) {
    case FilterBy.Active:
      return todos.filter(todo => !todo.completed);
    case FilterBy.Completed:
      return todos.filter(todo => todo.completed);
    case FilterBy.All:
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(Errors.DEFAULT);
  const [filterBy, setFilterBy] = useState(FilterBy.All);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Start loading
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErrorMessage(Errors.LOAD);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }, []);

  const filteredTodos = filter(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        {loading ? (
          <Loader message="Loading your todos..." />
        ) : todos.length > 0 ? (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              todos={todos}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          </>
        ) : null}
      </div>
      {errorMessage !== Errors.DEFAULT && (
        <ErrorModal
          errorMessage={errorMessage}
          onClearError={() => setErrorMessage(Errors.DEFAULT)}
        />
      )}
    </div>
  );
};
