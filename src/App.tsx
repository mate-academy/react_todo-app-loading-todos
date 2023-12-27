import {
  FC, MouseEvent, useEffect, useState,
} from 'react';
import { Todo, Filter } from './types';
import {
  Header, TodoList, Footer, Errors, UserWarning,
} from './components';
import { getTodos } from './api/todos';

const USER_ID = 12107;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<Filter>('All');

  // CALCULATING NUMBER OF ACTIVE TASKS
  const activeTodosNum = todos?.reduce((acc, curr) => {
    return !curr.completed
      ? acc + 1
      : acc;
  }, 0);

  const handleFilterChange = (event: MouseEvent<HTMLAnchorElement>) => {
    const { id } = event.target as HTMLAnchorElement;

    if (selectedFilter === id) {
      return;
    }

    setSelectedFilter(id as Filter);
  };

  useEffect(() => {
    // LOADING TODOS
    const loadData = async () => {
      try {
        const response = await getTodos(USER_ID);

        setTodos(response);
      } catch (error) {
        setErrorMessage('Unable to load todos');
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    };

    loadData();

    // CLEEARING ERRORS before next API call
    // not sure if this is correct
    return () => {
      setShowError(false);
      setErrorMessage('');
    };
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  // FILTERING TODOS
  let filteredTodos;

  if (todos?.length) {
    filteredTodos = [...todos];
    switch (selectedFilter) {
      case 'Active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'Completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {
          todos && !!todos.length && (
            <>
              <TodoList
                filteredTodos={filteredTodos}
              />
              <Footer
                activeTodosNum={activeTodosNum}
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
              />
            </>
          )
        }
      </div>

      {/* Notification is shown in case of any error */}
      <Errors
        showError={showError}
        setShowError={setShowError}
        errorMessage={errorMessage}
      />
    </div>
  );
};
