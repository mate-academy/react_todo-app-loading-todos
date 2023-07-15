/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorMesage } from './components/ErrorMessage/ErrorMesage';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { fetchTodos } from './api/todos';

const USER_ID = 11028;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.ALL)
  const [errorNotification, setErrorNotification] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const arrTodos = await fetchTodos(USER_ID.toString());

        setTodos(arrTodos);
        setErrorNotification(false);
      } catch {
        setErrorNotification(true);
        setError('Unable to fetch todos');
      }
    };

    if (USER_ID) {
      fetchData();
    }
  }, [USER_ID, setTodos]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Filter.ACTIVE:
          return !todo.completed;
        case Filter.COMPLETED:
          return todo.completed;
        default:
          break;
      }

      return true;
    });
  }, [Filter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          todos={todos}
          search={search}
          setSearch={setSearch}
        />

        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <Footer
            todosShow={filteredTodos}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {errorNotification && (
        <ErrorMesage errorString={error} />
      )}
    </div>
  );
};
