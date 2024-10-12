/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Filter.All);

  const completedTodos = [...todos].filter(todo => todo.completed);
  const activeTodos = [...todos].filter(todo => !todo.completed);

  const filteredTodos = () => {
    switch (filter) {
      case Filter.Completed:
        return completedTodos;
      case Filter.Active:
        return activeTodos;
      default:
        return todos;
    }
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() =>
        setTimeout(() => {
          setErrorMessage('');
        }, 3000),
      );
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} completedTodos={completedTodos} />

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={filteredTodos()} />
        </section>

        {/* Hide the footer if there are no todos */}

        {todos.length > 0 && (
          <Footer
            activeTodos={activeTodos}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
