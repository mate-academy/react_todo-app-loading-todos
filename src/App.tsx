/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState(Filter.All);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(result => {
          setTodos(result);
        })
        .catch(() => {
          setIsError(true);
        });
    }
  }, []);

  const handleFilter = (value: Filter) => {
    setFilterOption(value);
  };

  const getFilteredTodos = () => {
    let filteredTodos = todos;

    switch (filterOption) {
      case Filter.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case Filter.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      case Filter.All:
      default:
        break;
    }

    return filteredTodos;
  };

  const filteredTodos = useMemo(getFilteredTodos, [filterOption, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              onSelect={handleFilter}
              filterOption={filterOption}
            />
          </>
        )}
      </div>

      {isError && <ErrorNotification />}
    </div>
  );
};
