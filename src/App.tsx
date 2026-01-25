/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FILTERS, FilterType } from './constants/filters';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorMessage } from './constants/errors';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(FILTERS.all);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorHidden, setIsErrorHidden] = useState(true);

  useEffect(() => {
    if (!USER_ID) return;

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.Load);
        setIsErrorHidden(false);

        setTimeout(() => {
          setIsErrorHidden(true);
        }, 3000);
      });
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (filter === FILTERS.active) return !todo.completed;
    if (filter === FILTERS.completed) return todo.completed;
    return true;
  });

  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {!USER_ID && <UserWarning />}

      {USER_ID && (
        <div className="todoapp__content">
          <Header />

          {todos.length > 0 && (
            <>
              <TodoList todos={visibleTodos} />

              <Footer
                filter={filter}
                onFilterChange={setFilter}
                todosLeft={todosLeft}
              />
            </>
          )}
        </div>
      )}

      <ErrorNotification
        message={errorMessage}
        isHidden={isErrorHidden}
        onClose={() => setIsErrorHidden(true)}
      />
    </div>
  );
};
