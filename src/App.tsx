/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { Error } from './utils/Error';
import { FilterValue } from './utils/FilterValue';

const USER_ID = 6752;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState('all');
  const [errorMessage, setErrorMessage] = useState<Error>(Error.NoError);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setErrorMessage(Error.Loading);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const getFilteringTodos = ():Todo[] => {
    let visibleTodos = [...todos];

    switch (filterValue) {
      case FilterValue.Active: visibleTodos = visibleTodos.filter(
        (todo) => !todo.completed,
      );
        break;
      case FilterValue.Completed: visibleTodos = visibleTodos.filter(
        (todo) => todo.completed,
      );
        break;
      default:
        break;
    }

    return visibleTodos;
  };

  const completedTodos = todos.filter(
    (todo) => todo.completed,
  );

  const activeTodos = todos.filter(
    (todo) => !todo.completed,
  );

  return (
    <>

      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <header className="todoapp__header">
            <button type="button" className="todoapp__toggle-all active" />

            <form>
              <input
                type="text"
                className="todoapp__new-todo"
                placeholder="What needs to be done?"
              />
            </form>
          </header>

          <section className="todoapp__main">

            <TodoList todos={getFilteringTodos()} />

          </section>
          {todos.length ? (
            <Footer
              setFilterValue={setFilterValue}
              filterValue={filterValue}
              completedTodos={completedTodos}
              activeTodos={activeTodos}
            />
          ) : null}
        </div>

        {errorMessage && <Notification errorMessage={errorMessage} />}
      </div>

    </>
  );
};
