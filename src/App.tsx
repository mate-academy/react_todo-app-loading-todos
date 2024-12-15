/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

import { Header } from './commponents/Header';
import { TodoList } from './commponents/TodoList';
import { Footer } from './commponents/Footer';

enum Status {
  Active = 'active',
  Completed = 'completed',
  All = 'all',
}

enum HasError {
  UnableToLoad = 'Unable to load todos',
  TitleNotEmpty = 'Title should not be empty',
  UnableToAdd = 'Unable to add a todo',
  UnableToDelete = 'Unable to delete a todo',
  UnableToUpdate = 'Unable to update a todo',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtered, setFiltered] = useState<Status>(Status.All);
  const [isError, setIsError] = useState<string>('');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const isTodos = await getTodos();

        setTodos(isTodos);
      } catch {
        setIsError(HasError.UnableToLoad);
        setTimeout(() => setIsError(''), 3000);
      }
    };

    fetchTodo();
  }, []);

  const countTodo = todos.filter(todo => !todo.completed).length;

  const todoFilter = todos.filter(todo => {
    if (filtered === Status.Active) {
      return !todo.completed;
    }

    if (filtered === Status.Completed) {
      return todo.completed;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={todoFilter} />
        {todos.length > 0 && (
          <Footer
            filtered={filtered}
            onFiltered={setFiltered}
            countTodo={countTodo}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!isError ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsError('')}
        />
        {isError}
      </div>
    </div>
  );
};
