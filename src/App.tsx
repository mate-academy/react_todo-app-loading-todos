/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from './types/Todo';
import { TodosContext } from './components/TodosContext';
import { TodosFilter } from './types/TodosFilter';
import { TodosHeader } from './components/TodosHeader';
import { TodosList } from './components/TodosList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api/todos';

const USER_ID = 11891;

const DEFAULT_DATA = {
  userId: USER_ID,
  title: '',
  completed: false,
};

const useFilter = (todos: Todo[], filter: string) => {
  return todos.filter(todo => {
    switch (filter) {
      case TodosFilter.active:
        return !todo.completed;
      case TodosFilter.completed:
        return todo.completed;
      default:
        return true;
    }
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFilter, setTodosFilter] = useState<TodosFilter>(TodosFilter.all);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(todo => setTodos(todo))
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const todosAfterFiltering = useFilter([...todos], todosFilter);
  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <TodosContext.Provider
      value={{
        DEFAULT_DATA,
        todosAfterFiltering,
        todosFilter,
        setTodos,
        setTodosFilter,
      }}
    >

      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodosHeader />

          <TodosList />

          {/* Hide the footer if there are no todos */}
          {todos.length > 0 && (
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${todosLeft} items left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              <TodoFilter />

              {/* don't show this button if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </footer>
          )}
        </div>

        <div
          data-cy="ErrorNotification"
          className={cn(
            'notification is-danger is-light has-text-weight-normal', {
              hidden: !errorMessage,
            },
          )}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button data-cy="HideErrorButton" type="button" className="delete" />
          {/* show only one message at a time */}
          {errorMessage}
        </div>
      </div>
    </TodosContext.Provider>
  );
};
