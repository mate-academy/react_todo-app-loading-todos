import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

const USER_ID = 12005;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [filter, setFilter] = useState(Filter.All);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setErrorMessage('');
    setLoading(true);

    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
        setVisibleTodos(data);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setLoading(false)); // Set loading to false in any case
  }, []);

  useEffect(() => {
    setVisibleTodos(filteredTodos);
  }, [filter, todos, filteredTodos]);

  const filteredTodos = useMemo(() => {
    let copyTodos = [...todos];

    switch (filter) {
      case Filter.Active:
        copyTodos = copyTodos.filter(todo => !todo.completed);
        break;

      case Filter.Completed:
        copyTodos = copyTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return copyTodos;
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      {/* ... (your existing JSX code) ... */}
      
      <div
        data-cy="ErrorNotification"
        className={classNames(
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

export default App;
