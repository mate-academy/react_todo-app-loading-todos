/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm';
import { TodoMain } from './components/TodoMain';
import { TodoFooter } from './components/TodoFooter';
import { TodoErrors } from './components/TodoErrors';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 11127;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
        setFilteredTodos(data);
      }).catch(() => setError('There is no Internet connection'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodosLength = filteredTodos
    .filter(filteredTodo => !filteredTodo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={
              classNames('todoapp__toggle-all', {
                'todoapp__toggle-all active': activeTodosLength !== 0,
              })
            }
          />

          {/* Add a todo on form submit */}
          <TodoForm />
        </header>

        {
          todos.length !== 0
          && (
            <>
              <TodoMain todos={filteredTodos} />
              <TodoFooter todos={todos} setFilteredTodos={setFilteredTodos} />
            </>
          )
        }
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error.length !== 0
        && <TodoErrors error={error} />}
    </div>
  );
};
