import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';

import {
  ErrorNotification,
  ErrorMessages,
} from './components/ErrorNotification';
import { Footer, TodoStatus } from './components/Footer';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { Todo as TodoItem } from './components/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteringByCompleted, setFilteringByCompleted] = useState<TodoStatus>(
    TodoStatus.ALL,
  );
  const [errorMessage, setErrorMessage] = useState(ErrorMessages.NONE);
  const [errorRenderIteration, setErrorRenderIteration] = useState(1);

  function displayError(message: ErrorMessages) {
    setErrorMessage(message);
    setErrorRenderIteration(current => current + 1);
  }

  // > Fetching

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        displayError(ErrorMessages.FAILED_LOAD);
      });
  }, []);

  // > Filtering

  const filteredTodos = todos.filter(todo => {
    let satisfiesCompleted: boolean;

    switch (filteringByCompleted) {
      case TodoStatus.ACTIVE:
        satisfiesCompleted = !todo.completed;
        break;
      case TodoStatus.COMPLETED:
        satisfiesCompleted = todo.completed;
        break;
      default:
        satisfiesCompleted = true;
        break;
    }

    return satisfiesCompleted;
  });

  // > Counting incomplete

  let incompleteTodoQuantity = 0;

  todos.forEach(todo => {
    if (!todo.completed) {
      incompleteTodoQuantity += 1;
    }
  });

  const hasCompletedTodos = todos.length !== incompleteTodoQuantity;

  // > Returns

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {/*
          Why hide this if it doesn't take up any space?
          Wouldn't it be worse for performance?
        */}
        {!!todos.length && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isSelected={false}
                  isLoading={false}
                />
              );
            })}
          </section>
        )}

        {!!todos.length && (
          <Footer
            incompleteTodoQuantity={incompleteTodoQuantity}
            onFilterSelect={setFilteringByCompleted}
            activeFiltering={filteringByCompleted}
            isAnyTodoCompleted={hasCompletedTodos}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        key={errorRenderIteration}
      />
    </div>
  );
};
