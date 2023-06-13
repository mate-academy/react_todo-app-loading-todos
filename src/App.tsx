/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoInfo } from './components/TodoInfo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { Filter } from './enums/filter';
import { ErrorMessage } from './enums/error';
import { Error } from './components/Error';

const USER_ID = 10567;

const URL = `/todos?userId=${USER_ID}`;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState(Filter.All);
  const [errorMessage, setErrorMessage]
  = useState<ErrorMessage>(ErrorMessage.NONE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(URL);
        const todosData = response as Todo[];

        setTodos(todosData);
      } catch (error) {
        setErrorMessage(ErrorMessage.LOAD);
      }
    };

    fetchData();
  }, []);

  const selectActive = () => {
    setFilterValue(Filter.Active);
  };

  const selectAll = () => {
    setFilterValue(Filter.All);
  };

  const selectCompleted = () => {
    setFilterValue(Filter.Completed);
  };

  const filteredTodos = useMemo(() => {
    return todos?.filter(todo => {
      switch (filterValue) {
        case Filter.Active:
          return !todo.completed;
        case Filter.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [todos, filterValue]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={filteredTodos} />

        <section className="todoapp__main">
          {filteredTodos?.map(({ completed, title, id }) => (
            <TodoInfo
              completed={completed}
              title={title}
              key={id}
            />
          ))}
        </section>

        {filteredTodos && (
          <Footer
            todos={filteredTodos}
            filterValue={filterValue}
            onActive={selectActive}
            onAll={selectAll}
            onCompleted={selectCompleted}
          />
        )}
      </div>

      {!!errorMessage && (
        <Error
          errorMessage={errorMessage}
          onCloseError={() => setErrorMessage(ErrorMessage.NONE)}
        />
      )}
    </div>
  );
};
