/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

const USER_ID = 7033;

function getVisibleTodos(todos: Todo[], filterBy: string) {
  let visibleTodos = [...todos];

  if (filterBy !== Filter.All) {
    visibleTodos = visibleTodos.filter(({ completed }) => {
      switch (filterBy) {
        case Filter.Active:
          return !completed;
        case Filter.Completed:
          return completed;
        default:
          return true;
      }
    });
  }

  return visibleTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');

  const loadTodos = async () => {
    // setIsLoading(true);

    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setErrorMessage((error as Error).message);

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
    //   finally {
    //   setIsLoading(false);
    // }
  };

  const visibleTodos = getVisibleTodos(todos, filterBy);

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <TodoList todos={visibleTodos} />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterBy={filterBy}
            onChangeFilter={setFilterBy}
          />
        )}
      </div>

      <div
        className="notification is-danger is-light has-text-weight-normal"
        hidden={!errorMessage}
      >
        <button
          type="button"
          className="delete"
          onClick={() => {
            setErrorMessage('');
          }}
        />
        {errorMessage}
      </div>
    </div>
  );
};
