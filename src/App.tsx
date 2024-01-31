import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { Error } from './components/errorBlock/Error';
import { Footer } from './components/footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/header/Header';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Errors } from './types/Errors';
import { Filter } from './types/Filter';

const USER_ID = 54;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState<Errors | ''>('');
  const [filter, setFilter] = useState(Filter.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setHasError(true);
        setErrorType(Errors.Load);
      });
  }, []);

  function filteredTodos() {
    switch (filter) {
      case Filter.ALL:
        return todos;
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header />
      <TodoList filteredTodos={filteredTodos()} />
      {todos.length !== 0 && (
        <Footer
          setFilter={(filt) => setFilter(filt)}
          filter={filter}
          todos={todos}
        />
      )}
      {hasError && (
        <Error errorType={errorType} />
      )}
    </div>
  );
};
