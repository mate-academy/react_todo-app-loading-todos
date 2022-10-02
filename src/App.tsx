import React, {
  useState, useContext, useEffect,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';

import { Todo } from './types/Todo';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { SortType } from './types/SortType';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredBySelect, setFilteredBySelect] = useState(SortType.All);
  const [errorLoad, setErrorLoad] = useState(false);

  const filteredTodo = [...todos].filter(todo => {
    switch (filteredBySelect) {
      case SortType.Active:
        return !todo.completed;

      case SortType.Completed:
        return todo.completed;

      case SortType.All:
      default:
        return todo;
    }
  });

  const loadTodosFromServer = async () => {
    setErrorLoad(false);

    try {
      if (user?.id) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (error) {
      setErrorLoad(true);
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">

        <Header />

        <TodoList filteredTodo={filteredTodo} />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            setFilteredBySelect={setFilteredBySelect}
            filteredBySelect={filteredBySelect}
          />
        )}
      </div>

      <ErrorNotification
        errorLoad={errorLoad}
        setErrorLoad={setErrorLoad}
      />
    </div>
  );
};
