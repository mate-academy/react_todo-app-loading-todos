/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
// import { UserWarning } from './UserWarning';
// import { USER_ID } from './api/todos';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import cn from 'classnames';
import { Errors } from './utils/Errors';
import { FilterTodosBy } from './utils/FilterTodosBy';

export const App: React.FC = () => {
  // kinda useless after the rigestration ?
  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState<Errors>(Errors.NoError);
  const [filterBy, setFilterBy] = useState<FilterTodosBy>(FilterTodosBy.All);

  useEffect(() => {
    setHasError(Errors.NoError);
    const getTodosData = async () => {
      try {
        const response = await getTodos();

        setTodos(response);
      } catch (error) {
        setHasError(Errors.UnableToLoad);
        setTimeout(() => {
          setHasError(Errors.NoError);
        }, 3000);
      }
    };

    getTodosData();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case FilterTodosBy.Active:
        return !todo.completed;
      case FilterTodosBy.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const uncompletedTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <div className="todoapp__content">
        <h1 className="todoapp__title">todos</h1>
        <Header />
        <TodoList todos={filteredTodos} />
        {todos.length > 0 && (
          <Footer
            uncompletedTodos={uncompletedTodos}
            filterBy={filterBy}
            setFilteredBy={setFilterBy}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !hasError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setHasError(Errors.NoError);
          }}
        />
        {/* show only one message at a time */}
        {hasError}
      </div>
    </div>
  );
};
