import { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoErrors, TodosFilter } from './types/enums';

import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodosFilter>(TodosFilter.All);
  const [error, setError] = useState<TodoErrors | null>(null);
  const [isErrorShown, setIsErrorShown] = useState(false);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
        setDisplayedTodos(data);
      })
      .catch(() => {
        setError(TodoErrors.FetchError);
        setIsErrorShown(true);
        setTimeout(() => setIsErrorShown(false), 3000);
      });
  }, []);

  const handleFilterChange = (newFilter: TodosFilter) => {
    setFilter(newFilter);

    setDisplayedTodos(
      todos.filter(todo => {
        if (newFilter === TodosFilter.Active) {
          return !todo.completed;
        }

        if (newFilter === TodosFilter.Completed) {
          return todo.completed;
        }

        return true;
      }),
    );
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isToggleAllActive={todos.every(todo => todo.completed)} />

        {todos.length > 0 && (
          <>
            <TodoList todos={displayedTodos} />

            <Footer
              todos={todos}
              currentFilter={filter}
              handleFilterChange={handleFilterChange}
            />
          </>
        )}
      </div>

      <ErrorNotification
        error={error}
        visible={isErrorShown}
        handleCloseError={() => setIsErrorShown(false)}
      />
    </div>
  );
};
