/* eslint-disable */

import React, {useState, useEffect} from 'react';
import { UserWarning } from './UserWarning';
import * as clientMethods from './api/todos';
import type { Todo } from './types/Todo'
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';
import { ErrorType } from './types/ErrorType';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  if (!clientMethods.USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(ErrorType.None);
  const [selectedFilterLink, setSelectedFilterLink] = useState(FilterType.All);

  const filterLinks = [
    { label: 'All', value: FilterType.All, href: '#/', dataCy: 'FilterLinkAll' },
    { label: 'Active', value: FilterType.Active, href: '#/active', dataCy: 'FilterLinkActive' },
    { label: 'Completed', value: FilterType.Completed, href: '#/completed', dataCy: 'FilterLinkCompleted' },
  ];

  const handleAddTodo = (newTodo : Todo) : void => {
    setTodos([...todos, newTodo]);
  }

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await clientMethods.getTodos();

        setTodos(loadedTodos);
      } catch (err) {
        setError(ErrorType.Load);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();

  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }
    const timer = setTimeout(() => setError(ErrorType.None), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  const allTodosCompleted = todos.length > 0 && todos.every(todo => todo.completed);
  let filteredTodos = todos;

  switch (selectedFilterLink) {
    case FilterType.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    case FilterType.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    default :
      filteredTodos = todos;
      break;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 &&
            <button
              type="button"
              className={`todoapp__toggle-all ${allTodosCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
            />
          }

          {/* Add a todo on form submit */}
          <NewTodoForm
            onAdd={handleAddTodo}
            onError={setError}
            isLoading={isLoading}
          />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            todos={filteredTodos}
          />
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
        <footer className="todoapp__footer"
          data-cy="Footer"
        >
          <span className="todo-count" data-cy="TodosCounter">
            {`${todos.filter(todo => !todo.completed).length } items left`}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            {filterLinks.map(link => (
              <a 
                key={link.value}
                href={link.href}
                className={`filter__link ${selectedFilterLink === link.value ? 'selected' : ''}`}
                data-cy={link.dataCy}
                onClick={() => setSelectedFilterLink(link.value)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className={`todoapp__clear-completed
              ${todos.filter(todo => todo.completed).length === 0 ? 'hidden' : ''}`
            }
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!error ? `hidden` : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(ErrorType.None)}
        />
        {/* show only one message at a time */}
        {error}
      </div>
    </div>
  );
};
