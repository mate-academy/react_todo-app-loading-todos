/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorType } from './types/Error';
import { FilterType } from './types/FilterType';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import cs from 'classnames';


export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setError(ErrorType.LoadTodos);

        window.setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList todos={todos} filterBy={filterBy} />
        {todos.length > 0 && (
          <Footer
            setFilterBy={setFilterBy}
            filterBy={filterBy}
            todos={todos}
            clearCompleted={clearCompleted}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cs(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        <div>
          {error}
          <br />
        </div>
      </div>
    </div>
  );
};
