/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { ErrorNotification } from './components/ErrorNotification';
import { FooterMenu } from './components/FooterMenu';
import { ListOfTodos } from './components/ListOfTodos';
import { Header } from './components/Header';
import { UserWarning } from './UserWarning';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { CustomError } from './types/CustomError';
import { ActiveTodoData } from './types/ActiveTodoData';

import { USER_ID } from './utils/fetchClient';
import { initData } from './constants/initData';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initData.todos);
  const [filter, setFilter] = useState<Filter>(initData.filter);
  const [customError, setError]
    = useState<CustomError | null>(initData.customError);
  const [activeTodoData, setActiveTodo]
    = useState<ActiveTodoData>(initData.activeTodoData);

  const filterCallback = ((todo: Todo) => {
    switch (filter) {
      case Filter.Completed:
        return todo.completed;
      case Filter.Active:
        return !todo.completed;
      default:
        return true;
    }
  });

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setActiveTodo({
          hasActiveTodo: todosFromServer.some(todo => !todo.completed),
          activeLeft: todosFromServer.filter(todo => !todo.completed).length,
        });
      })
      .catch(() => {
        setError(CustomError.update);
        setTimeout(() => setError(null), 3000);
      });
  }, []);

  useEffect(() => {
    setActiveTodo({
      hasActiveTodo: todos.some(todo => !todo.completed),
      activeLeft: todos.filter(todo => !todo.completed).length,
    });
    setError(null);
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodoData={activeTodoData} />

        <ListOfTodos
          todos={todos}
          filterCallback={filterCallback}
        />

        {Boolean(todos.length) && (
          <FooterMenu
            activeTodoData={activeTodoData}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {customError && (
        <ErrorNotification
          customError={customError}
          setError={setError}
        />
      )}
    </div>
  );
};
