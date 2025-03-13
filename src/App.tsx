import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import TodoList from './components/TodoList';
import Footer from './components/Footer/Footer';
import ErrorMessage from './components/ErrorMessage';
import { ErrorType } from './components/ErrorMessage/types';
import { getFiltredTodoList } from './components/Footer/service';
import { Filter } from './components/Footer/types';

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
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={filtredTodos} />

        {!!todos.length && (
          <Footer todos={todos} filter={filter} updateFilter={setFilter} />
        )}
      </div>

      <ErrorMessage error={error} />
    </div>
  );
};
