import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { SORTFIELD } from './types/SortField';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [errorMessage, setErrorMessage] = useState('');

  const [isEditing, setIsEditing] = useState<number | null>(null);

  const [sortField, setSortField] = useState<SORTFIELD>(SORTFIELD.ALL);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  function getPreparedTodos(items: Todo[], sortType: SORTFIELD) {
    let preparedTodos = [...items];

    if (sortType === SORTFIELD.ACTIVE) {
      preparedTodos = preparedTodos.filter(t => !t.completed);
    } else if (sortType === SORTFIELD.COMPLETED) {
      preparedTodos = preparedTodos.filter(t => t.completed);
    }

    return preparedTodos;
  }

  const visibleTodos = getPreparedTodos(todos, sortField);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList
          todos={visibleTodos}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            sortField={sortField}
            setSortField={setSortField}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
