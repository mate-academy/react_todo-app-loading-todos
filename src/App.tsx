/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/FilterType';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { FilterContext } from './contexts/FilterContext';
import { TodosContext } from './contexts/TodosContext';

const USER_ID = 10314;

const getFilteredTodos = (todos: Todo[], filterType: FilterType) => {
  return todos.filter(todo => {
    switch (filterType) {
      case FilterType.All:
        return todo;

      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default: throw new Error('Wrong filter type!');
    }
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterType.All);
  const [errorNotification, setErrorNotification] = useState('');

  const filteredTodos: Todo[] = useMemo(() => (
    getFilteredTodos(todos, filterType)), [todos, filterType]);

  const activeTodosCount = useMemo(() => (
    todos.filter(todo => !todo.completed).length), [todos]);

  const loadTodos = async () => {
    setErrorNotification('');
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setErrorNotification('Error on loading');
    }
  };

  useEffect(() => {
    loadTodos();
  }, [filterType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todosCount={filteredTodos.length} />

        {!!filteredTodos.length && (
          <>
            <TodosContext.Provider value={{ todos: filteredTodos }}>
              <Main />
            </TodosContext.Provider>

            <FilterContext.Provider value={{
              filter: filterType,
              setFilter: setFilterType,
            }}
            >
              <Footer
                todosCount={filteredTodos.length}
                activeTodosCount={activeTodosCount}
              />
            </FilterContext.Provider>
          </>
        )}

      </div>

      {errorNotification && (
        <ErrorNotification errorNotification={errorNotification} />
      )}
    </div>
  );
};
