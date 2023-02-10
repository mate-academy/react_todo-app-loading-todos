/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { UserWarning } from './UserWarning';
import { TodoAppHeader } from './components/TodoAppHeader';
import { TodoAppTodo } from './components/TodoAppTodo';
import { getTodos, deleteTodo } from './api/todos';
import { TodoAppFooter } from './components/TodoAppFooter';

const USER_ID = 6270;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [typeError, setTypeError] = useState('');
  const [errorHidden, setErrorHidden] = useState(true);
  const [timerIdError, setTimerIdError] = useState<NodeJS.Timeout | null>(null);
  const [filterByStatus, setFilterByStatus] = useState(Status.All);

  const activeTodos = todos.filter(todo => !todo.completed);
  const allTodosCompleted = todos.every(todo => todo.completed);
  let visibleTodos;

  switch (filterByStatus) {
    case Status.Active:
      visibleTodos = activeTodos;
      break;

    case Status.Completed:
      visibleTodos = todos.filter(todo => todo.completed);
      break;

    default:
      visibleTodos = todos;
      break;
  }

  const getErrorText = () => {
    return typeError.length > 0
      ? `Unable to ${typeError} a todo`
      : 'Unexpected error';
  };

  const deleteHandler = () => {
    setErrorHidden(true);
    if (timerIdError) {
      clearTimeout(timerIdError);
    }

    deleteTodo()
      .catch(() => {
        setTypeError('delete');
        setErrorHidden(false);
        const timerId = setTimeout(setErrorHidden, 3000, true);

        setTimerIdError(timerId);
      });
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(loadedTodos => setTodos(loadedTodos))
      .catch(() => {
        setErrorHidden(false);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader allTodosCompleted={allTodosCompleted} />

        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              {visibleTodos.map(todo => (
                <TodoAppTodo
                  todo={todo}
                  deleteHandler={deleteHandler}
                  key={todo.id}
                />
              ))}
            </section>

            <TodoAppFooter
              itemsLeft={activeTodos.length}
              filterByStatus={filterByStatus}
              setFilterByStatus={setFilterByStatus}
            />
          </>
        )}
      </div>

      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: errorHidden },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorHidden(true)}
        />
        {getErrorText()}
      </div>
    </div>
  );
};
