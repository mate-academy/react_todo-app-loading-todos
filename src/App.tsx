import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList/TodoList';

// type Errors = 'upload' | 'title' | 'add' | 'delete' | 'update' | '';
enum Errors {
  Upload = 'upload',
  Title = 'title',
  Add = 'add',
  Delete = 'delete',
  Update = 'update',
  None = '',
}

enum FiltersParam {
  All = 'All',
  Completed = 'Completed',
  Active = 'Active',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadTodos, setLoadTodos] = useState<boolean>(false);
  const [hasError, setHasError] = useState<Errors>(Errors.None);
  const [filter, setFilter] = useState<FiltersParam>(FiltersParam.All);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [allTodosCount, setAllTodosCount] = useState<number>(0);

  useEffect(() => {
    setLoadTodos(true);
    setHasError(Errors.None);
    setCompletedTodos([]);

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    getTodos()
      .then(data => {
        setAllTodosCount(data.length);

        const filteredData = data.filter(todo => {
          switch (filter) {
            case FiltersParam.Completed:
              return todo.completed === true;
            case FiltersParam.Active:
              return todo.completed === false;
            case FiltersParam.All:
            default:
              return todo;
          }
        });

        const finishedTodos: Todo[] = data.filter(todo => todo.completed);

        setCompletedTodos(finishedTodos);

        setTodos(filteredData);
      })
      .catch(error => {
        setHasError(Errors.Upload);
        throw error;
      })
      .finally(() => {
        setLoadTodos(false);
        timeoutId = setTimeout(() => {
          setHasError(Errors.None);
        }, 3000);
      });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          allTodosCount={allTodosCount}
          completedCount={completedTodos.length}
          loadTodos={loadTodos}
        />

        <TodoList todos={todos} loadTodos={loadTodos} />

        <TodoFooter
          allTodosCount={allTodosCount}
          todoLeft={allTodosCount - completedTodos.length}
          filter={filter}
          setFilter={(newFilter: FiltersParam) => setFilter(newFilter)}
          loadTodos={loadTodos}
        />
      </div>

      <ErrorNotification
        hasError={hasError}
        loadTodos={loadTodos}
        setHasError={(errorMsg: Errors) => setHasError(errorMsg)}
      />
    </div>
  );
};
