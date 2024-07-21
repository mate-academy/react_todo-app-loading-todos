import { useState, useMemo, useEffect } from 'react';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Header } from './Components/Header';
import { TodoFilter } from './Components/TodoFilter';
import { TodoList } from './Components/TodoList';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState(Filters.all);
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(setTasks)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case Filters.active:
        return tasks.filter(todo => !todo.completed);
      case Filters.completed:
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
