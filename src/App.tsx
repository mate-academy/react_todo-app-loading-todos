import {
  FC,
  useContext,
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Footer';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FiltType } from './types/Filter';
import { filtTodos } from './components/filtTodos';
import { reducer } from './components/reducer';

export const App: FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filtType, setFiltType] = useState<FiltType>(FiltType.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completeItem, dispatch] = useReducer(reducer, 0);

  const increase = () => dispatch('increase');

  const getUserTodosFromServer = useCallback(async (userId: number) => {
    try {
      const userTodosFromServer = await getTodos(userId);

      setTodos(userTodosFromServer);
    } catch {
      setErrorMessage('Unable to update todos');
    }
  }, [user, todos]);

  useEffect(() => {
    if (!user) {
      return;
    }

    getUserTodosFromServer(user.id);
  }, [user]);

  useEffect(() => {
    todos.map(todo => {
      if (!todo.completed) {
        increase();
      }

      return 0;
    });
  }, [todos]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const visibleTodos = useMemo(() => (
    filtTodos(todos, filtType)
  ), [todos, filtType]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            aria-label="toggle all"
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

        <TodoList visibleTodos={visibleTodos} />

        {!!todos.length && (
          <Filter
            filtType={filtType}
            completeItem={completeItem}
            onFiltChange={setFiltType}
          />
        )}
      </div>

      {errorMessage && (
        <ErrorNotification errorMessage={errorMessage} />
      )}
    </div>
  );
};
