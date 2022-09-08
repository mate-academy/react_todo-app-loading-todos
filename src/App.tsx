import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Errors } from './components/Errors/Errors';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterOption } from './types/FilterOption';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [filterOption, setFilterOption] = useState<boolean | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user) {
          const loadTodos = await getTodos(user.id);

          setTodos(loadTodos);
        }
      } catch {
        setLoadError(true);
      }
    };

    loadData();

    // focus the element with `ref={newTodoField}`

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  if (!user) {
    return null;
  }

  const filterTodos = (option: string) => {
    switch (option) {
      case FilterOption.active:
        setFilterOption(false);

        break;

      case FilterOption.completed:
        setFilterOption(true);

        break;

      case FilterOption.all:
        setFilterOption(null);

        break;

      default:
        setFilterOption(null);

        break;
    }
  };

  const closeError = () => {
    setLoadError(false);
  };

  if (loadError) {
    setTimeout(() => {
      setLoadError(false);
    }, 3000);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          todos={todos}
        />

        <TodoList
          todos={todos}
          filterOption={filterOption}
        />

        <Footer
          todos={todos}
          filterTodos={filterTodos}
          filterOption={filterOption}
        />
      </div>

      <Errors
        loadError={loadError}
        closeError={closeError}
      />
    </div>
  );
};
