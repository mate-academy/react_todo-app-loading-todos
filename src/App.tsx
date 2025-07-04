/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { useTodosManager } from './hooks/useTodosManager';
import { TodosFilter } from './components/Footer/TodosFilter';
import { TodosCounter } from './components/Footer/TodosCounter';
import { ClearCompletedButton } from './components/Footer/ClearCompletedButton';
import { Header } from './components/header/Header';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const {
    todos,
    loading,
    errorMessage,
    setErrorMessage,
    filter,
    setFilter,
    todosCounter,
    preparedTodos,
  } = useTodosManager();

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={preparedTodos} loading={loading} />
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <TodosCounter count={todosCounter} />

            <TodosFilter filter={filter} setFilter={setFilter} />

            <ClearCompletedButton />
          </footer>
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
