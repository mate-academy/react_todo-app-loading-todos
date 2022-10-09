/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer/Footer';
import { Errors } from './components/Errors';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [filterValue, setFilterValue] = useState('All');
  const [countActive, setCountActive] = useState(0);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const handleError = (isError: boolean, message: string) => {
    setError({ isError, message });

    if (message) {
      setTimeout(() => {
        setError({ isError: false, message: '' });
      }, 3000);
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    (async function loadTodos() {
      try {
        const getTodos
          = await client.get<Todo[]>(`/todos?userId=${user?.id}`);

        setTodos(getTodos);
        setVisibleTodos(getTodos);
        setCountActive(
          (getTodos.filter(todo => !todo.completed)).length,
        );
      } catch (e) {
        handleError(true, 'Unable to load todos');
      }
    }());
  }, []);

  const filterTodos = (value: string) => {
    switch (value) {
      case 'All':
        setFilterValue('All');
        setVisibleTodos(todos);
        break;
      case 'Active':
        setFilterValue('Active');
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;
      case 'Completed':
        setFilterValue('Completed');
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;
      default:
        break;
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          newTodoField={newTodoField}
        />

        <TodoList
          todos={visibleTodos}
        />

        {todos.length > 0 && (
          <Footer
            filterTodos={filterTodos}
            countActive={countActive}
            filterValue={filterValue}
          />
        )}
      </div>

      <Errors
        error={error}
        handleError={handleError}
      />
    </div>
  );
};
