import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { FilterStatus } from './enums/enums';

const filterTodos = (todos: Todo[], status: FilterStatus) => {
  let filteredTodos = [...todos];

  if (status === FilterStatus.Active) {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (status === FilterStatus.Completed) {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [statusValue, setStatusValue] = useState(FilterStatus.All);
  const [error, setError] = useState('');

  const todosCompleted = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const todosActive = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const showErrorContainer = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setTodos(await getTodos());
      } catch {
        showErrorContainer('Unable to load todos');
      }
    }

    fetchData();
  }, []);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, statusValue);
  }, [todos, statusValue]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Header todosActive={todosActive} todosCompleted={todosCompleted} />

      <div className="todoapp__content">
        {todos.length !== 0 && <TodoList todos={filteredTodos} />}

        {todos.length !== 0 && (
          <Footer
            todosActive={todosActive}
            todosCompleted={todosCompleted}
            statusValue={statusValue}
            handleStatusValueChange={setStatusValue}
          />
        )}
      </div>
      <ErrorNotification error={error} hideNotification={() => setError('')} />
    </div>
  );
};
