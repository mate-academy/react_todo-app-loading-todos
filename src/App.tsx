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
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotifications';
import { NewTodoField } from './components/NewTodoField/NewTodoField';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { Todo } from './types/Todo';
import { FilteringMethod } from './types/FilteringMethod';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [hasError, setHasError] = useState(false);
  const [todoStatus, setTodoStatus]
    = useState<FilteringMethod>(FilteringMethod.All);

  const getTodosFromsServer = useCallback(async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (err) {
      setHasError(true);

      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromsServer();
  }, []);

  useEffect(() => {
    let todosCopy = [...todos];

    if (todoStatus !== 'All') {
      todosCopy = todosCopy.filter(todo => {
        switch (todoStatus) {
          case FilteringMethod.Active:
            return !todo.completed;

          case FilteringMethod.Completed:
            return todo.completed;

          default:
            return true;
        }
      });
    }

    setVisibleTodos(todosCopy);
  }, [todos, todoStatus]);

  const handleErrorClose = useCallback(() => setHasError(false), []);
  const handleStatusSelect = useCallback((status: FilteringMethod) => {
    setTodoStatus(status);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodoField newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList visibleTodos={visibleTodos} />

            <TodosFilter
              todos={todos}
              filteringMethod={todoStatus}
              handleStatusSelect={handleStatusSelect}
            />
          </>
        )}

      </div>

      <ErrorNotification
        hasError={hasError}
        setHasError={setHasError}
        handleErrorClose={handleErrorClose}
      />
    </div>
  );
};
