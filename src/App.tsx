/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Errors } from './components/Errors';
import { ListFooter } from './components/ListFooter';
import { ListHeader } from './components/ListHeader';
import { TodoList } from './components/TodoList';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [filter, setFilter] = useState(Filter.All);
  const [hasError, setHasError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);

  const getTodosFromsServer = async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    getTodosFromsServer();
  }, []);

  const filterHandler = (filterSelected: Filter) => {
    setFilter(filterSelected);
  };

  const closeErrorHandler = () => {
    setHasError(false);
  };

  useEffect(() => {
    setFilteredTodos(
      todos.filter(todo => {
        switch (filter) {
          case Filter.Active:
            return !todo.completed;

          case Filter.Completed:
            return todo.completed;

          case Filter.All:
          default:
            return todo;
        }
      }),
    );
  }, [filter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <ListHeader />

        {todos.length && (
          <>
            <TodoList todos={filteredTodos} />
            <ListFooter
              todos={todos}
              filter={filter}
              onFilterSelect={filterHandler}
            />
          </>
        )}
      </div>
      <Errors hasError={hasError} onCloseError={closeErrorHandler} />
    </div>
  );
};
