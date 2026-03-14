/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { Footer } from './components/footer/Footer';
import { Main } from './components/main/Main';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/errorNotification/ErrorNotification';
import { Header } from './components/header/Header';

const testArr: Todo[] = [
  // {
  //   id: 74,
  //   userId: 4,
  //   title: 'expedita tempore nobis eveniet laborum maiores',
  //   completed: false,
  // },
  // {
  //   id: 74,
  //   userId: 4,
  //   title: '123',
  //   completed: true,
  // },
];

export const App: React.FC = () => {
  const [toDos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const isAllCompleted = toDos.length > 0 && toDos.every(t => t.completed);
  const visibleTodos = toDos.filter(todo => {
    if (filter === FilterStatus.Active) {
      return !todo.completed;
    }

    if (filter === FilterStatus.Completed) {
      return todo.completed;
    }

    return true;
  });

  function showError(message: string) {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  useEffect(() => {
    setError(null);
    getTodos()
      .then(data => {
        if (data.length === 0) {
          setTodos(testArr);
        } else {
          setTodos(data);
        }
      })
      .catch(() => showError('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isAllCompleted={isAllCompleted} toDosCount={toDos.length} />

        <Main visibleTodos={visibleTodos} />

        {toDos.length > 0 && (
          <Footer
            filter={filter}
            activeCount={toDos.filter(todo => !todo.completed).length}
            hasCompleted={toDos.some(todo => todo.completed)}
            onFilterChange={setFilter} // Просто передаем функцию setFilter
            onClear={() => setTodos(toDos.filter(todo => !todo.completed))}
          />
        )}

        <ErrorNotification error={error} onClose={() => setError(null)} />
      </div>
    </div>
  );
};
