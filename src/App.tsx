/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Header } from './components/Auth/Header/header';
import { TodoList } from './components/Auth/TodoList/TodoList';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Footer } from './components/Auth/Footer/footer';
import { Error } from './components/Auth/Error/Error';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [filter, setFilter] = useState(Filter.ALL);
  const user = useContext(AuthContext);

  useEffect(() => {
    const loadTodos = async () => {
      if (!user) {
        return;
      }

      const todoFromServer = await getTodos(user.id);

      setTodos(todoFromServer);
    };

    loadTodos();
  }, [user]);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      case Filter.ALL:
      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header />
        {todos.length === 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              todos={filteredTodos}
              filter={filter}
              onSetFilter={setFilter}
            />
          </>
        )}

      </div>
      {isError && (
        <Error
          errorMessage={setIsError}
        />
      )}
    </div>
  );
};
