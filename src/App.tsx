/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import * as todosService from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Footer } from './components/Footer';
import { FilterType } from './types/FilterType';
import { filterTodos } from './utils/filterTodos';
import { countActiveTodos } from './utils/countActiveTodos';
import { areAllCompleted } from './utils/areAllCompleted';
import { areAllActive } from './utils/areAllActive';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('All');
  const [errorMessage, setErrorMessage] = useState('');

  const loadTodos = () => {
    todosService
      .getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  };

  useEffect(loadTodos, []);

  const changeError = useCallback(debounce(setErrorMessage, 3000), []);

  const resetError = () => {
    changeError('');
  };

  useEffect(() => {
    if (errorMessage) {
      resetError();
    }
  }, [errorMessage]);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    return todosService.createTodo(newTodo).then(todo => {
      setTodos(currentTodos => [...currentTodos, todo]);
    });
  };

  const filteredTodos = useMemo(
    () => filterTodos(todos, { filter }),
    [todos, filter],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm
          onSubmit={addTodo}
          onSetError={setErrorMessage}
          areAllCompleted={areAllCompleted(todos)}
        />

        {Boolean(todos.length) && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              onAddFilter={setFilter}
              filter={filter}
              activeTodos={countActiveTodos(todos)}
              areAllActive={areAllActive(todos)}
            />
          </>
        )}
      </div>

      <Error errorMessage={errorMessage} onChangeError={setErrorMessage} />
    </div>
  );
};
