/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Error } from './components/Error';
import { FieldForSorting, Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [fieldForSorting, setFieldForSorting]
    = useState<FieldForSorting>(FieldForSorting.All);

  const getTodosFromAPI = useCallback(async () => {
    setIsError(false);
    if (user) {
      try {
        const todosFromAPI = await getTodos(user.id);

        setTodos(todosFromAPI);
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

  const selectFieldForSorting = useCallback((fieldForSort: FieldForSorting) => {
    setFieldForSorting(fieldForSort);
  }, [fieldForSorting]);

  const counterActiveTodos = useMemo(() => {
    const completedTodos = todos.filter(todo => todo.completed);

    return todos.length - completedTodos.length;
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (fieldForSorting) {
        case FieldForSorting.Active:
          return !todo.completed;

        case FieldForSorting.Completed:
          return todo.completed;

        case FieldForSorting.All:
        default:
          return true;
      }
    });
  }, [todos, fieldForSorting]);

  const hasTodos = todos.length > 0;

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

        {hasTodos
          ? (
            <>
              <TodoList todos={filteredTodos} />
              <Footer
                fieldForSorting={fieldForSorting}
                selectFieldForSorting={selectFieldForSorting}
                counterActiveTodos={counterActiveTodos}
              />
            </>
          )
          : 'List is empty'}
      </div>

      {hasTodos && <Error isError={isError} closeError={closeError} />}
    </div>
  );
};
