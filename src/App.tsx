import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { AppContext } from './components/AppContext';
import { ContextValue } from './types/ContentValue';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  const loadTodos = async () => {
    if (user) {
      try {
        const result = await getTodos(user.id);

        setTodosFromServer(result);
        setVisibleTodos(result);
      } catch {
        setError('Unable to load todos');
      }
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const filteredTodos = todosFromServer.filter(todo => {
      switch (filter) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [filter]);

  const contextValue: ContextValue = {
    setFilter,
    loadTodos,
    filter,
    visibleTodos,
    todosFromServer,
    user,
    error,
    setError,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          {user && <Header />}

          <TodoList />

          {todosFromServer.length > 0 && <Footer />}
        </div>

        {error && <Error />}

      </div>
    </AppContext.Provider>
  );
};
