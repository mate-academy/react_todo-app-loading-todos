import { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoAppHeader } from './components/TodoAppHeader';
import { TodoList } from './components/TodoList';
import { TodoAppFooter } from './components/TodoAppFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { Nullable } from './types/Nullable';
import { Todo } from './types/Todo';
import { FilterOption } from './types/FilterOption';
import { addTodo, getTodos, USER_ID } from './api/todos';
import { filterTodos } from './utils/filterTodos';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Nullable<string>>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterOption>(FilterOption.ALL);

  const isEmpty = todos.length === 0;
  const activeTodosCount = filterTodos(todos, FilterOption.ACTIVE).length;
  const allCompleted = !isEmpty && activeTodosCount === 0;

  const visibleTodos = filterTodos(todos, filter);

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const handleAddTodo = (newTodoTitle: string) => {
    setErrorMessage(null);

    addTodo(newTodoTitle)
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
      })
      .catch(() => showError('Unable to add a todo'));
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => showError('Unable to load todos'))
      .finally(() => setIsLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader
          allCompleted={allCompleted}
          onAddTodo={handleAddTodo}
          onError={showError}
        />

        {!isLoading && <TodoList todos={visibleTodos} />}

        {!isEmpty && (
          <TodoAppFooter
            allCompleted={allCompleted}
            activeTodosCount={activeTodosCount}
            filter={filter}
            onSelectFilter={setFilter}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};
