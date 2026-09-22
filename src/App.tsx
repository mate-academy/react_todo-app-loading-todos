/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { NewTodo } from './Components/NewTodo';
import { TodoList } from './Components/TodoList';
import { ErrorNotification } from './Components/ErrorNotification';
import { Todo } from './types/Todo';
import { Footer } from './Components/Footer/Footer';
import { FILTERS } from './types/Filters';

function getFilteredTodos(todos: Todo[], selectedStatus: FILTERS) {
  return todos.filter(todo => {
    switch (selectedStatus) {
      case FILTERS.active:
        return !todo.completed;

      case FILTERS.completed:
        return todo.completed;

      case FILTERS.all:
      default:
        return true;
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(FILTERS.all);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, selectedStatus);
  }, [todos, selectedStatus]);

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              todos={todos}
              selectedStatus={selectedStatus}
              onSelectedStatus={setSelectedStatus}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onErrorMessage={setErrorMessage}
      />
    </div>
  );
};
