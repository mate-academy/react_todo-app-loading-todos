/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Error } from './components/Error/Error';
import { FilterType } from './components/Enums/FilterType';
import { User } from './types/User';
import { Todo } from './types/Todo';

export const App: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext<User | null>(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const handleErrorClose = () => setError('');

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then((loadedTodos) => {
          setTodos(loadedTodos);
        })
        .catch(() => {
          setError('Can\'t load todos');
          setTimeout(handleErrorClose, 3000);
        });
    }
  }, []);

  let visibleTodos = [...todos];

  visibleTodos = useMemo(() => visibleTodos.filter(todo => {
    switch (filter) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        return true;
    }
  }), [filter, visibleTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              todos={visibleTodos}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </div>

      <Error
        error={error}
        onClick={handleErrorClose}
      />
    </div>
  );
};
