import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header/Header';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { TodoFilterOptions } from './types/TodoFiltersOptions';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [todoFilterValue, setTodoFilterValue] = useState<TodoFilterOptions>(
    TodoFilterOptions.All,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  const filterTodos = useCallback(
    (todosForFilter: Todo[], statusFilterValue: TodoFilterOptions) => {
      return todosForFilter.filter(todo => {
        let statusCorresponding = true;

        switch (statusFilterValue) {
          case TodoFilterOptions.Active:
            statusCorresponding = !todo.completed;
            break;
          case TodoFilterOptions.Completed:
            statusCorresponding = todo.completed;
            break;
          default:
            break;
        }

        return statusCorresponding;
      });
    },
    [],
  );

  const filteredTodos = useMemo(
    () => filterTodos(todos, todoFilterValue),
    [filterTodos, todos, todoFilterValue],
  );

  const uncompletedTodosCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const completedTodosCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  return (
    <>
      {USER_ID ? (
        <div className="todoapp">
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <Header />

            {!!todos.length && (
              <>
                <TodoList todos={filteredTodos} />
                <Footer
                  activeTodoFilter={todoFilterValue}
                  setTodoFilterValue={setTodoFilterValue}
                  uncompletedTodosCount={uncompletedTodosCount}
                  completedTodosCount={completedTodosCount}
                />
              </>
            )}
          </div>

          <ErrorNotification errorMessage={error} setErrorMessage={setError} />
        </div>
      ) : (
        <UserWarning />
      )}
    </>
  );
};
