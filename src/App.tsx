/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterType';
import { Header } from './components/Header';
import { ErrorInfo } from './components/ErrorInfo';
import { Footer } from './components/Footer';

function getFilteredTodos(todos: Todo[], filter: FilterType) {
  const filteredTodos = [...todos];

  switch (filter) {
    case FilterType.all:
      return filteredTodos;
    case FilterType.active:
      return filteredTodos.filter(todo => !todo.completed);
    case FilterType.completed:
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [, setLoad] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(FilterType.all);

  const filteredTodos = getFilteredTodos(todos, filter);

  function getCountActive(): number {
    return todos.filter(todo => !todo.completed).length;
  }

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
        setLoad(false);
      })
      .catch(() => setError('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      {/* <Loader /> */}
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header title={title} onChange={setTitle} />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer
            selected={filter}
            onSelect={setFilter}
            counter={getCountActive()}
          />
        )}
      </div>

      <ErrorInfo error={error} onError={setError} />
    </div>
  );
};
