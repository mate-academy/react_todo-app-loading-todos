/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { TypeError } from './types/TypeError';
import { UserWarning } from './UserWarning';
import { TodoAppHeader } from './components/TodoAppHeader';
import { TodoAppTodo } from './components/TodoAppTodo';
import { getTodos, deleteTodo } from './api/todos';
import { TodoAppFooter } from './components/TodoAppFooter';

const USER_ID = 6270;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [typeError, setTypeError] = useState('');
  const [textError, setTextError] = useState('');
  const [filterByStatus, setFilterByStatus] = useState(Status.All);

  const activeTodos = todos.filter(todo => !todo.completed);
  const areAllTodosCompleted = todos.every(todo => todo.completed);
  let visibleTodos;

  const getErrorText = () => {
    return typeError === 'unexpected'
      ? 'Unexpected error'
      : `Unable to ${textError} a todo`;
  };

  const deleteHandler = () => {
    setTypeError('');

    deleteTodo()
      .catch(() => {
        setTypeError(TypeError.Delete);
        setTextError(TypeError.Delete);
      });
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(loadedTodos => setTodos(loadedTodos))
      .catch(() => {
        setTypeError(TypeError.Unexpected);
      });
  }, []);

  useEffect(() => {
    const timerId = setTimeout(setTypeError, 3000, '');

    return () => clearTimeout(timerId);
  }, [typeError]);

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

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader allTodosCompleted={areAllTodosCompleted} />

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
          { hidden: typeError.length === 0 },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setTypeError('')}
        />
        {getErrorText()}
      </div>
    </div>
  );
};
