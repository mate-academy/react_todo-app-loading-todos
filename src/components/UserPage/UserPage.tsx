import { useEffect, useState } from 'react';
import { TodoHeader } from '../TodoHeader/TodoHeader';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';
import { TodoList } from '../TodoList/TodoList';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';
import { TodoFooter } from '../TodoFooter/TodoFooter';
import { FilterOptions } from '../../types/FilterOptions';
import { Errors } from '../../types/Errors';

export const UserPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Errors | null>(null);
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.All,
  );

  const isAllCompleted = todos.every(todo => todo.completed);
  const todosLeft = todos.filter(todo => !todo.completed).length;
  const todosAmount = todos.length;

  const handleFilterOption = (option: FilterOptions) => {
    setFilterOption(option);
  };

  const handleHideError = () => {
    setError(null);
  };

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await getTodos();

      setIsLoading(true);
      setTodos(fetchedTodos);
    } catch (e) {
      setError(Errors.ServerError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    let autoHideError: number;

    if (error !== null) {
      autoHideError = window.setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      window.clearTimeout(autoHideError);
    };
  }, [error]);

  // console.log(todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader isAllCompleted={isAllCompleted} todosAmount={todosAmount} />
        {!isLoading && todos.length > 0 && (
          <TodoList todos={todos} filterOption={filterOption} />
        )}
        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <TodoFooter
            todosLeft={todosLeft}
            handleFilterOption={handleFilterOption}
            filterOption={filterOption}
          />
        )}
      </div>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorNotification
        error={error ? new Error(error) : null}
        handleHideError={handleHideError}
      />
    </div>
  );
};
