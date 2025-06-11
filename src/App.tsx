/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';

export enum FilterParams {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export enum TodoErrorMessage {
  UNABLE_TO_LOAD = 'Unable to load todos',
  EMPTY_TiTLE = 'Title should not be empty',
  UNABLE_TO_ADD = 'Unable to add a todo',
  UNABLE_TO_DELETE = 'Unable to delete a todo',
  UNABLE_TO_UPDATE = 'Unable to update a todo',
}

const countActiveTodos = (todos: Todo[]) =>
  todos.filter(todo => !todo.completed).length;

const isAllTodosCompleted = (todos: Todo[]): boolean =>
  todos.every(todo => todo.completed);

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFilterParam, setSelectedFilterParam] = useState<FilterParams>(
    FilterParams.All,
  );

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(TodoErrorMessage.UNABLE_TO_LOAD);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChangeFilterParam = useCallback((filterParam: FilterParams) => {
    setSelectedFilterParam(filterParam);
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (selectedFilterParam === FilterParams.Active) {
      return !todo.completed;
    }

    if (selectedFilterParam === FilterParams.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isAllTodosCompleted={isAllTodosCompleted(todos)} />
        {!loading && !errorMessage && todos.length > 0 && (
          <TodoList todos={filteredTodos} />
        )}
        {todos.length > 0 && (
          <Footer
            countActiveTodos={countActiveTodos(todos)}
            selectedFilterParam={selectedFilterParam}
            handleChangeFilterParam={handleChangeFilterParam}
          />
        )}
      </div>

      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};
