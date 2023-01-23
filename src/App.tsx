/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  memo,
  useCallback,
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
// eslint-disable-next-line import/no-cycle
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

export enum Status {
  All,
  Active,
  Completed,
}

export const App: React.FC = memo(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusTodo, setStatusTodo] = useState(Status.All);
  const [errorNotice, setErrorNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(user?.id)
      .then(todo => setTodos(todo))
      .catch(() => {
        setErrorNotice(true);
        setErrorMessage('Error request for todos failed');
      });
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const todoStatus = useCallback((value: Status) => {
    switch (value) {
      case Status.Active:
        return todos.filter(todo => todo.completed === false);

      case Status.Completed:
        return todos.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  }, [todos]);

  const preparedTodo = todoStatus(statusTodo);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <TodoHeader newTodoField={newTodoField} />

        {todos.length !== 0 && (
          <>
            <TodoList
              todos={preparedTodo}
            />

            <TodoFooter
              onStatus={setStatusTodo}
              statusTodo={statusTodo}
            />
          </>
        )}

      </div>
      <ErrorNotification
        errorNotice={errorNotice}
        errorMessage={errorMessage}
        setErrorNotice={(Boolean:boolean) => setErrorNotice(Boolean)}
      />

    </div>
  );
});
