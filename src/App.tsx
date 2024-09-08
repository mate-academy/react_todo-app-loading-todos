import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { ErrorNotification, Footer, Header, TodoList } from './components';
import { State, Todo } from './types/Todo';

const filterTasks = (tasks: Todo[], filter: State): Todo[] => {
  return tasks.filter(task => {
    const matchesState =
      filter === State.ALL ||
      (filter === State.ACTIVE && !task.completed) ||
      (filter === State.COMPLETED && task.completed);

    return matchesState;
  });
};

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [state, setState] = useState(State.ALL);

  const handleError = useCallback((ErrorMessage: string) => {
    setErrorMessage(ErrorMessage);
    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  const handleStageChange = useCallback(
    (newState: State) => {
      setState(newState);
    },
    [setState],
  );

  const getTasks = () => {
    setIsLoading(true);

    getTodos()
      .then(setTasks)
      .catch(() => handleError('Unable to load todos'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = useMemo(
    () => filterTasks(tasks, state),
    [tasks, state],
  );
  const activeTasks = useMemo(
    () => tasks.filter(task => !task.completed).length,
    [tasks],
  );
  const completedTasks = useMemo(
    () => tasks.length - activeTasks,
    [tasks, activeTasks],
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

        {!isLoading && tasks.length !== 0 && (
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
