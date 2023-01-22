import React,
{
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { addTodos, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Footer } from './components/Footer/Footer';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  const handleAddTodo = useCallback(
    async () => {
      const todo = await addTodos(title, user?.id, false);

      setTodos(prev => [...prev, todo]);
    }, [],
  );

  const handleClickFilter = useCallback((filterType: Filter) => {
    if (user) {
      getTodos(user.id)
        .then(result => {
          return result.filter((item: Todo) => {
            if (filterType === Filter.ACTIVE) {
              return item.completed === false;
            }

            if (filterType === Filter.COMPLITED) {
              return item.completed;
            }

            return true;
          });
        });
    }
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(result => {
          setTodos(result);

          setLoaded(true);
        })
        .catch(() => {
          setErrorMessage('Todos not found');
        })
        .finally(() => {
        });
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          title={title}
          setTitle={setTitle}
          onAddTodo={handleAddTodo}
        />

        <TodoList todos={todos} />

        {!isLoaded && <Footer onSelectFilter={handleClickFilter} />}
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
