/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Filter } from './Components/Filter';
import { Error } from './Components/Error';
import { Todo, TodoStatus } from './types/Todo';
import { ErrorMessage } from './types/ErrorMessage';
import { filterTodos } from './Components/filterTodo';

const USER_ID = 6369;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(TodoStatus.All);
  const [errorType, setErrorType] = useState(ErrorMessage.None);
  const [isErrorShown, setIsErrorShown] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then((userTodos) => setTodos(userTodos))
      .catch(() => {
        setErrorType(ErrorMessage.Download);
        setIsErrorShown(true);
      });
  }, []);

  const counterActiveTodos = useMemo(
    () => todos.reduce((num, todo) => {
      return todo.completed ? num : num + 1;
    }, 0),
    [todos],
  );

  const counterCompletedTodos = todos.length - counterActiveTodos;

  const filteredTodos = useMemo(
    () => filterTodos(todos, selectedFilter),
    [selectedFilter, todos],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header counterActiveTodos={counterActiveTodos} />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Filter
            counterActiveTodos={counterActiveTodos}
            counterCompletedTodos={counterCompletedTodos}
            selectedFilter={selectedFilter}
            onFilterSelect={setSelectedFilter}
          />
        )}

        <Error
          errorMessage={errorType}
          isErrorShown={isErrorShown}
          onErrorClose={() => setIsErrorShown(false)}
        />
      </div>
    </div>
  );
};
