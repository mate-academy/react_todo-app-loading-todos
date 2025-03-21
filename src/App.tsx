import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import TodoList from './components/Todos/TodoList';
import ErrorMessage from './components/ErrorMessage';
import { ErrorType } from './types/ErrorType';
import { getFiltredTodoList } from './services/filterServices';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('FilterLinkAll');

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>(
    getFiltredTodoList(filter, todos),
  );

  const [error, setError] = useState<ErrorType>({
    isVisible: false,
    type: '',
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError({
          isVisible: true,
          type: 'load',
        });

        setTimeout(() => {
          setError({
            isVisible: false,
            type: '',
          });
        }, 3000);
      });
  }, []);

  useEffect(() => {
    setFiltredTodos(getFiltredTodoList(filter, todos));
  }, [filter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filtredTodos} />

        {!!todos.length && (
          <Footer todos={todos} filter={filter} updateFilter={setFilter} />
        )}
      </div>

      <ErrorMessage error={error} />
    </div>
  );
};
