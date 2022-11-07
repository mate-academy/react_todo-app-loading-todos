/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

import { getTodos } from './api/todos';
import { SortType } from './types/SortType';
import { AuthContext } from './components/Auth/AuthContext';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.ALL);
  const [error, setError] = useState(false);

  const filteredTodo = [...todos].filter(todo => {
    switch (sortType) {
      case SortType.ACTIVE:
        return !todo.completed;
      case SortType.COMPLETED:
        return todo.completed;
      default:
        return todo;
    }
  });

  const fetchTodos = async () => {
    setError(false);

    try {
      if (user?.id) {
        const fetchedTodos = await getTodos(user.id);

        setTodos(fetchedTodos);
      }
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    fetchTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              ref={newTodoField}
            />
          </form>
        </header>

        <TodoList todo={filteredTodo} />

        {!!todos.length && (
          <Footer
            todos={todos}
            sortType={sortType}
            setSortType={setSortType}
          />
        )}
      </div>

      <Error
        error={error}
        setError={setError}
      />
    </div>
  );
};
