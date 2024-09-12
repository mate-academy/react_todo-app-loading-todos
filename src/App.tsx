import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { ErrorNotification, Footer, Header, TodoList } from './components';
import { FilterType, Todo } from './types/Todo';

const filterTasks = (tasks: Todo[], filter: FilterType): Todo[] => {
  return tasks.filter(task => {
    const matchesState =
      filter === FilterType.ALL ||
      (filter === FilterType.ACTIVE && !task.completed) ||
      (filter === FilterType.COMPLETED && task.completed);

    return matchesState;
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [state, setState] = useState(FilterType.ALL);

  const handleError = useCallback((ErrorMessage: string) => {
    setErrorMessage(ErrorMessage);
    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  const handleStageChange = useCallback(
    (newState: FilterType) => {
      setState(newState);
    },
    [setState],
  );

  const getTasks = () => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => handleError('Unable to load todos'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = useMemo(
    () => filterTasks(todos, state),
    [todos, state],
  );
  const activeTasks = useMemo(
    () => todos.filter(task => !task.completed).length,
    [todos],
  );
  const completedTasks = useMemo(
    () => todos.length - activeTasks,
    [todos, activeTasks],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList tasks={filteredTasks} />

        {!isLoading && !!todos.length && (
          <Footer
            activeTasks={activeTasks}
            completedTasks={completedTasks}
            onStageChange={handleStageChange}
            state={state}
          />
        )}
      </div>
      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
