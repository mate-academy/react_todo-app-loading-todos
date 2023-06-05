/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Header } from './component/Header/Header';
import { Footer } from './component/Footer/Footer';
import { TodoApp } from './component/TodoApp/TodoApp';
import { getTodos } from './api/todos';
import { TodoFilter } from './types/TodoFilter';

const USER_ID = 10610;
const timeDelay = 3000;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredBy, setFilteredBy] = useState<TodoFilter>(TodoFilter.ALL);
  const [isError, setIsError] = useState(false);

  const getAllTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, timeDelay);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filteredBy) {
        case TodoFilter.ALL:
          return true;
        case TodoFilter.ACTIVE:
          return !todo.completed;
        case TodoFilter.COMPLETED:
          return todo.completed;
        default:
          return false;
      }
    });
  }, [todos, filteredBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoApp todos={todos} />
        <Footer
          filteredBy={filteredBy}
          setFilteredBy={setFilteredBy}
          todos={filteredTodos}
        />
      </div>

      <div
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !isError },
        )}
      >
        <button type="button" className="delete" />

        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
