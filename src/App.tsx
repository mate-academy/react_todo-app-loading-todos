/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

import { TodoList } from './components/todoList/TodoList';
import { getFilteredData } from './helpres/helpers';
import { FilterTypes } from './enum/FilterTypes';
import { Provider } from './context/context';
import { TodoForm } from './components/todoForm/TodoForm';
import { FilterFooter } from './components/filterFooter/FilterFooter';
import { ErrorSection } from './components/errorSection/ErrorSection';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterTypes.All);

  const [todoLoadingStates, setTodoLoadingStates] = React.useState<{
    [key: number]: boolean;
  }>({});
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleFilterChange = (filterType: FilterTypes) => {
    setFilter(filterType);
  };

  const displayedTodos = getFilteredData(todos, filter);

  const setTodoLoading = (id: number, loading: boolean) => {
    setTodoLoadingStates(prevState => ({ ...prevState, [id]: loading }));
  };

  async function getTodosList() {
    try {
      const todosData = await getTodos();

      setTodos(todosData);
    } catch (error) {
      setErrorMessage('Unable to load todos');
      throw error;
    }
  }

  useEffect(() => {
    getTodosList();
  }, []);

  useEffect(() => {
    let mistakeTimer = 0;

    if (errorMessage) {
      mistakeTimer = window.setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }

    return () => {
      window.clearTimeout(mistakeTimer);
    };
  }, [errorMessage]);

  const contextValue = {
    todoLoadingStates,
    setTodoLoading,
    setErrorMessage,
    setTodos,
  };

  return (
    <Provider value={contextValue}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoForm todos={todos} />

          {todos.length > 0 && <TodoList todoList={displayedTodos} />}

          {todos.length > 0 && (
            <FilterFooter
              todos={todos}
              handleFilterChange={handleFilterChange}
            />
          )}
        </div>

        <ErrorSection
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </Provider>
  );
};
