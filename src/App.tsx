import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodosList } from './components/TodosList';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { FilterBy } from './utils/Enums/FilterBy';
import { Header } from './components/Header';
import { ErrorType } from './utils/Enums/ErrorType';

import { Todo } from './types/Todo';
import { FilterByType } from './types/FilterBy';

import { getTodos, post } from './api/todos';

const USER_ID = 10217;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [query, setQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<FilterByType>(FilterBy.ALL);
  const [error, setError] = useState<ErrorType>(ErrorType.INITIAL);

  const loadData = () => {
    getTodos(USER_ID)
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => {
        setError(ErrorType.GET);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTodos = useMemo(() => (
    todos?.filter(todo => {
      switch (filterBy) {
        case FilterBy.ACTIVE:
          return !todo.completed;

        case FilterBy.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    })
  ), [todos, filterBy]);

  const isTodoCompleted = useMemo(() => (
    filteredTodos?.some(todo => todo.completed) || false
  ), [filteredTodos]);

  const isEveryTodoCompleted = useMemo(() => (
    filteredTodos?.every(todo => todo.completed) || false
  ), [filteredTodos]);

  const counter = useMemo(() => (
    filteredTodos?.filter(todo => !todo.completed).length || 0
  ), [filteredTodos]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim().length) {
      try {
        await post(USER_ID, query);
        loadData();
      } catch (errorFromServer) {
        setError(ErrorType.POST);
      }
    } else {
      setError(ErrorType.QUERY);
    }

    setQuery('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          query={query}
          setQuery={setQuery}
          isEveryTodoCompleted={isEveryTodoCompleted}
          handleSubmit={handleSubmit}
        />

        <section className="todoapp__main">
          {filteredTodos && (
            <TodosList todos={filteredTodos} />
          )}
        </section>

        <Footer
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          isTodoCompleted={isTodoCompleted}
          counter={counter}
        />
      </div>

      <div className={
        classNames('notification is-danger is-light has-text-weight-normal',
          { hidden: error === ErrorType.INITIAL })
      }
      >
        <Error
          error={error}
          setError={setError}
        />
      </div>
    </div>
  );
};
