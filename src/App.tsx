/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoHeader } from './component/TodoHeader/TodoHeader';
import { TodoFooter } from './component/TodoFooter/TodoFooter';
import { Status } from './types/Status';
import { TodoList } from './component/TodoList/TodoList';
import { TodoErrorNotification } from './component/TodoErrorNotification/TodoErrorNotification';

export const App: React.FC = () => {

  enum Errors {
    'titleError' = 'Title should not be empty',
    'addTodoError' = 'Unable to add a todo',
    'updateTodoError' = 'Unable to update a todo',
    'loadTodoError' = 'Unable to load todos',
  }


  const [hasTitleError, setHasTitleError] = useState(false);
  const [loadTodoError, setLoadTodoError] = useState(false);
  const [status, setStatus] = useState('all');
  const errorTimerRef = useRef<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setLoadTodoError(true);
        resetError();
      });
  }, []);

  const resetError = () => {
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }
    errorTimerRef.current = window.setTimeout(() => {
      setHasTitleError(false);
      setLoadTodoError(false);
      errorTimerRef.current = null;
    }, 3000);
  };


  const hideErrors = () => {
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }

    setHasTitleError(false);
    setLoadTodoError(false);
  };

  const getErrorMessage = () => {
    if (hasTitleError) return Errors.titleError;
    if (loadTodoError) return Errors.loadTodoError;
    return '';
  };
  const isErrorHidden = () => !hasTitleError && !loadTodoError;



  const filteredTodos = todos.filter(todo => {
    if (status === Status.active) {
      return !todo.completed;
    }
    if (status === Status.completed) {
      return todo.completed;
    }
    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader setHasTitleError={setHasTitleError} />
        {todos.length > 0 && (
          <>
            <TodoList filteredTodos={filteredTodos} />
            <TodoFooter todos={todos} status={status} setStatus={setStatus} />
          </>
        )}
        {/* Hide the footer if there are no todos */}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <TodoErrorNotification getErrorMessage={getErrorMessage} isErrorHidden={isErrorHidden} hideErrors={hideErrors} />

    </div>
  );
};
