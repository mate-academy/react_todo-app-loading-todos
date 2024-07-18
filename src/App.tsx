/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, FC, useState, useMemo } from 'react';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { TodoList } from './Components/TodoList';
import { USER_ID } from './api/todos';
import cn from 'classnames';
import { Todo } from './types/Todo';
import { Header } from './Components/Header';
import { Filters } from './Components/Filters';
import { TodoFilter } from './Components/TodoFilter';

export const App: FC = () => {
  const [currentFilter, setCurrentFilter] = useState(Filters.All);
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTasks)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case Filters.Active:
        return tasks.filter(todo => !todo.completed);
      case Filters.Completed:
        return tasks.filter(todo => todo.completed);
      default:
        return tasks;
    }
  }, [currentFilter, tasks]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList tasks={filteredTodos} />

        {tasks.length > 0 && (
          <TodoFilter
            filter={currentFilter}
            setFilter={setCurrentFilter}
            todos={tasks}
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
        <br />
      </div>
    </div>
  );
};
