import React, { useEffect, useState } from 'react';
import { TodoMain } from './components/TodoMain';
import { TodoHeader } from './components/TodoHeader';
import { FilterType } from './types/FilterType';
import { TodoNotification } from './components/TodoNotification';
import { TodoFooter } from './components/TodoFooter';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorType } from './types/ErrorType';

const USER_ID = 12031;

const filterTodos = (sourceTodos: Todo[], filterBy: FilterType) => {
  let filteredTodos: Todo[];

  switch (filterBy) {
    case FilterType.Active:
      filteredTodos = sourceTodos.filter(todo => !todo.completed);
      break;

    case FilterType.Completed:
      filteredTodos = sourceTodos.filter(todo => todo.completed);
      break;

    default:
      filteredTodos = [...sourceTodos];
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [
    selectedFilter,
    setSelectedFilter,
  ] = useState<FilterType>(FilterType.All);

  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);

  const [
    currentError,
    setCurrentError,
  ] = useState<ErrorType>(ErrorType.NoError);

  const onError = (error: ErrorType) => {
    setCurrentError(error);
    setTimeout(() => setCurrentError(ErrorType.NoError), 3000);
  };

  useEffect(() => {
    setCurrentError(ErrorType.NoError);
    getTodos(USER_ID)
      .then(setTodosFromServer)
      .catch(() => (onError(ErrorType.UnableToLoad)));
  }, []);

  const [isBeingEdited] = useState(false);
  const [isBeingSaved] = useState(false);

  const filteredTodos = filterTodos(todosFromServer, selectedFilter);

  const activeTodosCount = todosFromServer.reduce((acc, todo) => {
    if (todo.completed) {
      return acc;
    }

    return acc + 1;
  }, 0);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader isAnyTodoActive={!!activeTodosCount} />

        <TodoMain
          todos={filteredTodos}
          isBeingEdited={isBeingEdited}
          isBeingSaved={isBeingSaved}
        />

        {todosFromServer.length !== 0 && (
          <TodoFooter
            activeTodosCount={activeTodosCount}
            isAnyTodoCompleted={activeTodosCount !== todosFromServer.length}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
      </div>

      <TodoNotification
        currentError={currentError}
        setCurrentError={setCurrentError}
      />
    </div>
  );
};
