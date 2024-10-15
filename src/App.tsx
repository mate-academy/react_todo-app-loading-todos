import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Filter } from './types/Filter';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErorrNotification';

export const App: React.FC = () => {
  const [displayedTodos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const completedTodos = [...displayedTodos].filter(todo => todo.completed);
  const activeTodos = [...displayedTodos].filter(todo => !todo.completed);

  const filteredTodos = () => {
    switch (filter) {
      case Filter.Completed:
        return completedTodos;
      case Filter.Active:
        return activeTodos;
      default:
        return displayedTodos;
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
        <Header todos={displayedTodos} completedTodos={completedTodos} />
      </div>
      <section className="todoapp__main" data-cy="TodoList">
        <TodoList displayedTodos={filteredTodos()} />
      </section>
      {displayedTodos.length > 0 && (
        <Footer
          activeTodos={activeTodos}
          filter={filter}
          setFilter={setFilter}
        />
      )}
      <div>
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </div>
  );
};
