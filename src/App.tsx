import {
  FC, MouseEvent, useEffect, useState,
} from 'react';
import { Todo, Filter } from './types';
import { AppContext, AppContextType } from './context/AppContext';
import {
  Header, TodoList, Footer, Errors, UserWarning,
} from './components';
import { getTodos } from './api/todos';

const USER_ID = 12107;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Filter>('All');
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const activeTodosNum = todos.reduce((acc, curr) => {
    return !curr.completed
      ? acc + 1
      : acc;
  }, 0);

  const completedTodosNum = todos.length - activeTodosNum;

  const handleFilterChange = (event: MouseEvent<HTMLAnchorElement>) => {
    const { id } = event.target as HTMLAnchorElement;

    if (selectedFilter === id) {
      return;
    }

    setSelectedFilter(id as Filter);
  };

  useEffect(() => {
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

    return () => {
      setShowError(false);
      setErrorMessage('');
    };
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  let filteredTodos = [...todos];

  if (todos.length) {
    switch (selectedFilter) {
      case 'Active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed) || [];
        break;
      case 'Completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed) || [];
        break;
      default:
        break;
    }
  }

  // context test
  const appContextValue: AppContextType = {
    todos,
    setTodos,
    selectedFilter,
    setSelectedFilter,
    showError,
    setShowError,
    errorMessage,
    setErrorMessage,
    filteredTodos,
    activeTodosNum,
    completedTodosNum,
    handleFilterChange,
  };
  //

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />
          {
            todos.length > 0 && (
              <>
                <TodoList />
                <Footer />
              </>
            )
          }
        </div>

        <Errors />
      </div>
    </AppContext.Provider>
  );
};
