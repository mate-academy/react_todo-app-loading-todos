/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { NewTodo } from './Components/NewTodo';
import { TodoList } from './Components/TodoList';
import { ErrorNotification } from './Components/ErrorNotification';
import { Todo } from './types/Todo';
import { Footer } from './Components/Footer/Footer';
import { FILTERS } from './types/Filters';

function getPreparedTodos(todos: Todo[], selectedStatus: string) {
  return todos.filter(todo => {
    let matchesStatus = true;

    if (selectedStatus === FILTERS.active) {
      matchesStatus = !todo.completed;
    } else if (selectedStatus === FILTERS.completed) {
      matchesStatus = todo.completed;
    }

    return matchesStatus;
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(FILTERS.all);

  const visibleTodos = getPreparedTodos(todos, selectedStatus);

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
