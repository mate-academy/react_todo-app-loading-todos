/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterTupes } from './types/Filters';
import { TodoList } from './components/todoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(FilterTupes.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  const activeTodosCount = useMemo(() => {
    return todos.filter(({ completed }) => !completed).length;
  }, [todos]);

  const filteredTodos = useMemo(() => {
    let FilteredTodos = todos;

    switch (filter) {
      case FilterTupes.Active:
        FilteredTodos = todos.filter(todo => !todo.completed);
        break;
      case FilterTupes.Complete:
        FilteredTodos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return FilteredTodos;
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer
            onFilter={setFilter}
            activeTodosCount={activeTodosCount}
            selectedFilter={filter}
          />
        )}
      </div>

      <Error message={errorMessage} onClose={() => setErrorMessage('')} />
    </div>
  );
};
