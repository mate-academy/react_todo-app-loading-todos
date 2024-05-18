/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { filterTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const [showError, setShowError] = useState('hidden');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [selected, setSelected] = useState('all');
  let timeid = 0;

  const countActive = () => {
    return todos.filter(todo => todo.completed === false).length;
  };

  const selectTodoFilter = (filter: string) => {
    setSelected(filter);
  };

  const todosAfterFilter = filterTodos(todos, selected);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTodos();

        setTodos(response);
      } catch (error) {
        setShowError('');
      } finally {
        timeid = window.setTimeout(() => {
          setShowError('hidden');
        }, 3000);
      }
    };

    fetchData();

    return () => {
      window.clearTimeout(timeid);
    };
  }, [selected]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />
        {todos.length > 0 && <Main todos={todosAfterFilter} />}
        {todos.length > 0 && (
          <Footer
            activeCount={countActive}
            selected={selected}
            selectTodoFilter={selectTodoFilter}
          />
        )}
      </div>
      {/*  */}

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${showError}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete hidden"
          onClick={() => setShowError('hidden')}
        />
        {/* show only one message at a time */}
        Unable to load todos
        {/* <br />
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
