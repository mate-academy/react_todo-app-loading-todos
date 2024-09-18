import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import * as todoService from './api/todos';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';

import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { SortBy } from './types/SortBy';

export const App: React.FC = () => {
  //#region States
  //Todos states
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);

  //Service states
  const [selectedSort, setSelectedSort] = useState<SortBy>(SortBy.All);
  const [errorMessage, setErrorMessage] = useState('');

  //#endregion

  const sortList = (sort: SortBy) => {
    switch (sort) {
      case SortBy.Active:
        setSortedTodos(todos.filter(todo => !todo.completed));
        break;
      case SortBy.Completed:
        setSortedTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setSortedTodos(todos);
        break;
    }
  };

  //#region useEffect
  useEffect(() => {
    todoService
      .getTodos()
      .then(el => {
        setTodos(el);
        setErrorMessage('');
      })
      .catch(er => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
        throw er;
      });
  }, []);

  useEffect(() => {
    sortList(selectedSort);
  }, [todos, selectedSort]);

  //#endregion

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList sortedTodos={sortedTodos} />

        {todos.length > 0 && (
          <Footer
            sortFunction={setSelectedSort}
            todos={todos}
            howSort={selectedSort}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
