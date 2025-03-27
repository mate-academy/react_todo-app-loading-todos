import React, { useState, useEffect, useCallback } from 'react';

import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

import { getTodos } from './api/todos';

import { TodoErrorMessages } from './constants/todoMessages';
import { countActiveTodos, isAlltodosCompleted } from './helpers/todo';

import { Todo } from './types/Todo';
import { FilterParams } from './constants/filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFilterParam, setSelectedFilterParam] = useState<FilterParams>(
    FilterParams.ALL,
  );

  useEffect(() => {
    setTodosLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(TodoErrorMessages.UNABLE_TO_LOAD);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setTodosLoading(false));
  }, []);

  const handleChangeFilterParam = useCallback((filterParam: FilterParams) => {
    setSelectedFilterParam(filterParam);
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (selectedFilterParam === FilterParams.ACTIVE) {
      return !todo.completed;
    }

    if (selectedFilterParam === FilterParams.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isAlltodosCompleted={isAlltodosCompleted(todos)} />

        {!todosLoading && !errorMessage && todos.length > 0 && (
          <TodoList todos={filteredTodos} />
        )}

        {todos.length > 0 && (
          <Footer
            countOfActiveTodos={countActiveTodos(todos)}
            handleChangeFilterParam={handleChangeFilterParam}
            selectedFilterParam={selectedFilterParam}
          />
        )}
      </div>

      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};
