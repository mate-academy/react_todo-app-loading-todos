/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Error } from './components/Error';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [fieldForSorting, setFieldForSorting] = useState('all');
  const [counterActiveTodos, setCounterActiveTodos] = useState(0);

  const getTodosFromAPI = useCallback(async () => {
    setIsError(false);
    if (user) {
      try {
        const recMovie = await getTodos(user.id);

        setTodos(recMovie);
      } catch {
        setIsError(true);
      }
    }

    setTimeout(() => {
      setIsError(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromAPI();
  }, []);

  const closeError = useCallback(() => {
    setIsError(false);
  }, []);

  const selectFieldForSorting = useCallback((fieldForSort: string) => {
    setFieldForSorting(fieldForSort);
  }, [fieldForSorting]);

  const countActiveTodos = useCallback(() => {
    const completedTodos = todos.filter(todo => todo.completed);

    setCounterActiveTodos(todos.length - completedTodos.length);
  }, [todos]);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (fieldForSorting) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;
          break;

        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
    countActiveTodos();
  }, [todos, fieldForSorting, counterActiveTodos]);

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
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer
            fieldForSorting={fieldForSorting}
            selectFieldForSorting={selectFieldForSorting}
            counterActiveTodos={counterActiveTodos}
          />
        )}
      </div>
      {todos.length > 0 && <Error isError={isError} closeError={closeError} />}
    </div>
  );
};
