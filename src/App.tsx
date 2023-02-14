import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';

import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';

import { Todo } from './types/Todo';

import { FilterType } from './enums/FilterType';
import { ErrorType } from './enums/ErrorType';
import { filterTodos } from './helpers/filterTodos';

const USER_ID = 6303;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(FilterType.All);
  const [errorType, setErrorType] = useState(ErrorType.None);
  const [isErrorShown, setIsErrorShown] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then((userTodos) => setTodos(userTodos))
      .catch(() => {
        setErrorType(ErrorType.Download);
        setIsErrorShown(true);
      });
  }, []);

  const activeTodosNum = useMemo(
    () => todos.reduce((num, todo) => {
      return todo.completed ? num : num + 1;
    }, 0),
    [todos],
  );
  const completedTodosNum = todos.length - activeTodosNum;

  const filteredTodos = useMemo(
    () => filterTodos(todos, selectedFilter),
    [selectedFilter, todos],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader activeTodosNum={activeTodosNum} />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <TodoFooter
            activeTodosNum={activeTodosNum}
            completedTodosNum={completedTodosNum}
            selectedFilter={selectedFilter}
            onFilterSelect={setSelectedFilter}
          />
        )}
      </div>

      <ErrorNotification
        errorType={errorType}
        isErrorShown={isErrorShown}
        onNotificationClose={() => setIsErrorShown(false)}
      />
    </div>
  );
};
