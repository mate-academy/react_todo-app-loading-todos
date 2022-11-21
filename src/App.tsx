import React, { useContext, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotes } from './components/ErrorNotes';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header';
import { Todos } from './components/Todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const loadTodos = async () => {
    if (!user) {
      return;
    }

    try {
      const todosFromServer = await getTodos(user.id);

      setTodos(todosFromServer);
      setFilteredTodos(todosFromServer);
    } catch {
      setIsError(true);
      setTimeout(setIsError, 3000);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length !== 0
          && (
            <>
              <Todos todos={filteredTodos} />
              <Footer todos={todos} setFilteredTodos={setFilteredTodos} />
            </>
          )}
      </div>

      <ErrorNotes isError={isError} setIsError={setIsError} />
    </div>
  );
};
