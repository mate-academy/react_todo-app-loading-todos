/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, FC, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { TodoFiler } from './components/TodoFilter/TodoFilter';
import { Filters } from './types/Filters';
import { Header } from './components/Header/Header';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadError, setLoadError] = useState('');
  const [filter, setFilter] = useState(Filters.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setLoadError('Unable to load todos');
        setTimeout(() => setLoadError(''), 3000);
      });
  }, []);

  const preparedTodos = useMemo(() => {
    switch (filter) {
      case Filters.Active:
        return todos.filter(todo => !todo.completed);
      case Filters.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={preparedTodos} />

        {todos.length > 0 && (
          <TodoFiler filter={filter} setFilter={setFilter} todos={todos} />
        )}
        {/* Hide the footer if there are no todos */}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !loadError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setLoadError('')}
        />
        {/* show only one message at a time */}
        {loadError}
        <br />
        {/* Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
