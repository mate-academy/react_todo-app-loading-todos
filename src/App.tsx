/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { filterTodo } from './helpers/filterTodos';
import { SORT } from './types/SornEnum';
import { ErrorComponent } from './components/ErrorComponent';

const USER_ID = 11224;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortField, setSortField] = useState<SORT>(SORT.ALL);
  const [todosError, setTodosError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then((serverTodos) => setTodos(serverTodos))
      .catch(() => setTodosError('Unable to fetch a todo'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = filterTodo(todos, sortField);

  const updateSortField = (term: SORT) => {
    setSortField(term);
  };

  const onCloseError = () => {
    setTodosError('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              todos={todos}
              updateSortField={updateSortField}
              sortField={sortField}
            />
          </>
        )}
      </div>

      <ErrorComponent error={todosError} onCloseError={onCloseError} />
    </div>
  );
};
