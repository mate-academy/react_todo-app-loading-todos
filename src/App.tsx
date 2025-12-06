/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import * as todoApi from './api/todos';
import { TodoForm } from './Components/TodoForm';
import { TodoList } from './Components/TodoList';
import { TodoFooter } from './Components/TodoFooter';
import { Todo } from './types/Todo';
import { FilterTodo } from './types/FilterTodo';
import classNames from 'classnames';
import { filterTodo } from './Services/Todo';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterTodo>('all');
  const [loading, setLoading] = useState(false);
  const timerCloseId = useRef(0);

  const addTodo = (): Promise<void> => {
    return new Promise(resolve => {
      resolve();
    });
    //TODO
  };

  const addErrorMessage = (message: string) => {
    setErrorMessage(message);
    timerCloseId.current = window.setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const clearErrorMessage = () => {
    window.clearTimeout(timerCloseId.current);
    timerCloseId.current = 0;
    setErrorMessage('');
  };

  const getTodosFromServer = useCallback(async () => {
    try {
      setErrorMessage('');
      setLoading(true);
      const response = await todoApi.getTodos();

      setTodosFromServer(response);
    } catch (error) {
      addErrorMessage('Unable to load todos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTodosFromServer();

    return () => {
      setTodosFromServer([]);
    };
  }, [getTodosFromServer]);

  const filteredTodos = useMemo(() => {
    if (todosFromServer.length === 0) {
      return [];
    }

    return filterTodo(todosFromServer, filter);
  }, [filter, todosFromServer]);

  const isTodoListVisible =
    filteredTodos.length > 0 && !errorMessage && !loading;

  const isTodoFooterVisible =
    todosFromServer.length > 0 && !errorMessage && !loading;

  if (!todoApi.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm todos={todosFromServer} onSubmit={addTodo} />
        {isTodoListVisible && <TodoList todos={filteredTodos} />}
        {isTodoFooterVisible && (
          <TodoFooter
            currentFilter={filter}
            todos={todosFromServer}
            onChangeFilter={setFilter}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          errorMessage ? '' : 'hidden',
        )}
      >
        <button
          onClick={clearErrorMessage}
          data-cy="HideErrorButton"
          type="button"
          className="delete"
        />
        {errorMessage}
        {/* show only one message at a time */}
        {/* Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
