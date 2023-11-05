/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import { Todo } from './types/Todo';
import { FilterTodos } from './utils/FilterTodos';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { Error } from './components/Error/Error';

const USER_ID = 11857;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosError, setTodosError] = useState('');
  const [filteredTodos, setfilteredTodos] = useState(FilterTodos.ALL);
  const [hiddenClass, setHiddenClass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setTodosError('Unable to load todos');
        setHiddenClass(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filteredTodos) {
        case FilterTodos.ACTIVE:
          return !todo.completed;
          break;

        case FilterTodos.COMPLETED:
          return todo.completed;
          break;

        default:
          return true;
      }
    });
  }, [todos, filteredTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {/* {todosError ? (
          <p>{todosError}</p>
        ) : (
          <TodoList
            todos={visibleTodos}
          />
        )} */}

        <TodoList
          todos={visibleTodos}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <TodoFooter
            todos={todos}
            filteredTodos={filteredTodos}
            setfilteredTodos={setfilteredTodos}
          />
        )}
      </div>

      {!isLoading && (
        <Error
          hiddenClass={hiddenClass}
          todosError={todosError}
          onSetHiddenClass={setHiddenClass}
        />
      )}
    </div>
  );
};

// eslint-disable-next-line no-lone-blocks
{ /* <footer className="todoapp__footer" data-cy="Footer">
  <span className="todo-count" data-cy="TodosCounter">
    3 items left
  </span>

   Active filter should have a 'selected' class
  <nav className="filter" data-cy="Filter">
    <a
      href="#/"
      className="filter__link selected"
      data-cy="FilterLinkAll"
    >
      All
    </a>

    <a
      href="#/active"
      className="filter__link"
      data-cy="FilterLinkActive"
    >
      Active
    </a>

    <a
      href="#/completed"
      className="filter__link"
      data-cy="FilterLinkCompleted"
    >
      Completed
    </a>
  </nav>

   don't show this button if there are no completed todos
  <button
    type="button"
    className="todoapp__clear-completed"
    data-cy="ClearCompletedButton"
  >
    Clear completed
  </button>
</footer> */ }
